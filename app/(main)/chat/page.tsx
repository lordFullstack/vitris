import { TopBar } from "@/components/shell/TopBar";
import { ConversationList } from "@/components/chat/ConversationList";
import { ChatThread } from "@/components/chat/ChatThread";
import { conversationRepo, storeRepo, productRepo } from "@/lib/data";

export default async function ChatPage({
  searchParams,
}: {
  searchParams: { producto?: string; tienda?: string; conv?: string; mensaje?: string };
}) {
  if (searchParams.conv) {
    const conv = await conversationRepo.getById(searchParams.conv);
    const store = conv ? await storeRepo.getById(conv.storeId) : null;
    if (conv && store) {
      await conversationRepo.markRead(conv.id);
      const product = conv.productId ? await productRepo.getById(conv.productId) : null;
      return (
        <ChatThread
          conversationId={conv.id}
          store={store}
          product={product ?? undefined}
          initialMessages={conv.messages}
          status={conv.status}
        />
      );
    }
  }

  if (searchParams.producto) {
    const product = await productRepo.getById(searchParams.producto);
    if (product) {
      const conv = await conversationRepo.findOrCreate({
        storeId: product.store.id,
        productId: product.id,
      });
      await conversationRepo.markRead(conv.id);
      return (
        <ChatThread
          conversationId={conv.id}
          store={product.store}
          product={product}
          initialMessages={conv.messages}
          status={conv.status}
          initialInput={searchParams.mensaje}
        />
      );
    }
  }

  if (searchParams.tienda) {
    const store = await storeRepo.getById(searchParams.tienda);
    if (store) {
      const conv = await conversationRepo.findOrCreate({ storeId: store.id });
      await conversationRepo.markRead(conv.id);
      return (
        <ChatThread
          conversationId={conv.id}
          store={store}
          initialMessages={conv.messages}
          status={conv.status}
        />
      );
    }
  }

  const [conversations, stores] = await Promise.all([
    conversationRepo.list(),
    storeRepo.list(),
  ]);

  return (
    <>
      <TopBar title="Preguntas" />
      <ConversationList conversations={conversations} stores={stores} />
    </>
  );
}
