import { TopBar } from "@/components/shell/TopBar";
import { ConversationList } from "@/components/chat/ConversationList";
import { ChatThread } from "@/components/chat/ChatThread";
import { getConversation, findConversationByStore } from "@/lib/chat-data";
import { productRepo, storeRepo } from "@/lib/data";

export default async function ChatPage({
  searchParams,
}: {
  searchParams: { producto?: string; tienda?: string; conv?: string; mensaje?: string };
}) {
  if (searchParams.conv) {
    const conv = getConversation(searchParams.conv);
    const store = conv ? await storeRepo.getById(conv.storeId) : undefined;
    if (conv && store) {
      const product = conv.productId ? await productRepo.getById(conv.productId) : undefined;
      return (
        <ChatThread
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
      return (
        <ChatThread
          store={product.store}
          product={product}
          initialMessages={[]}
          initialInput={searchParams.mensaje}
        />
      );
    }
  }

  if (searchParams.tienda) {
    const store = await storeRepo.getById(searchParams.tienda);
    if (store) {
      const existing = findConversationByStore(store.id);
      if (existing) {
        return (
          <ChatThread
            store={store}
            initialMessages={existing.messages}
            status={existing.status}
          />
        );
      }
      return <ChatThread store={store} initialMessages={[]} />;
    }
  }

  return (
    <>
      <TopBar title="Preguntas" />
      <ConversationList />
    </>
  );
}
