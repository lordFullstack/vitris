import { TopBar } from "@/components/shell/TopBar";
import { ConversationList } from "@/components/chat/ConversationList";
import { ChatThread } from "@/components/chat/ChatThread";
import { getConversation, findConversationByStore } from "@/lib/chat-data";
import { productDetails } from "@/lib/product-detail";
import { stores } from "@/lib/mock-data";

export default function ChatPage({
  searchParams,
}: {
  searchParams: { producto?: string; tienda?: string; conv?: string };
}) {
  if (searchParams.conv) {
    const conv = getConversation(searchParams.conv);
    const store = conv ? stores[conv.storeId] : undefined;
    if (conv && store) {
      const product = conv.productId ? productDetails[conv.productId] : undefined;
      return (
        <ChatThread
          store={store}
          product={product}
          initialMessages={conv.messages}
          status={conv.status}
        />
      );
    }
  }

  if (searchParams.producto) {
    const product = productDetails[searchParams.producto];
    if (product) {
      return <ChatThread store={product.store} product={product} initialMessages={[]} />;
    }
  }

  if (searchParams.tienda) {
    const store = stores[searchParams.tienda];
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
