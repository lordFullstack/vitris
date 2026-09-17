"use client";

import { useState } from "react";
import Link from "next/link";
import type { Store, ProductDetail, ChatMessage, ConversationStatus } from "@/lib/types";
import { quickQuestions } from "@/lib/chat-data";
import { buildChatWhatsAppLink } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/format";
import { IconBack, IconWhatsapp } from "@/components/icons";

const statusLabel: Record<ConversationStatus, string> = {
  activa: "Activa",
  respondida: "Respondida",
  archivada: "Archivada",
};

export function ChatThread({
  store,
  product,
  initialMessages,
  status,
  initialInput,
}: {
  store: Store;
  product?: ProductDetail;
  initialMessages: ChatMessage[];
  status?: ConversationStatus;
  initialInput?: string;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState(initialInput ?? "");

  function sendText(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [
      ...m,
      { id: `local-${Date.now()}`, from: "user", text: trimmed, time: new Date().toISOString() },
    ]);
    setInput("");
  }

  const lastUserText =
    [...messages].reverse().find((m) => m.from === "user")?.text ?? "";
  const waLink = buildChatWhatsAppLink(store, lastUserText, product);

  return (
    <div className="flex flex-col">
      <header className="safe-top sticky top-0 z-30 flex items-center gap-3 border-b border-graphite-line/60 bg-void/90 px-3 py-3 backdrop-blur-xl">
        <Link
          href="/chat"
          aria-label="Volver"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-pill text-ink transition-colors active:bg-graphite-elevated"
        >
          <IconBack size={22} />
        </Link>
        <img src={store.avatarUrl} alt="" className="h-9 w-9 rounded-pill object-cover" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14.5px] font-semibold text-ink">{store.name}</p>
          <p className="text-[12px] text-ink-faint">
            {status ? statusLabel[status] : "Normalmente responde en minutos"}
          </p>
        </div>
      </header>

      {product && (
        <Link
          href={`/producto/${product.id}`}
          className="flex items-center gap-3 border-b border-graphite-line/50 bg-graphite px-4 py-2.5 transition-colors active:bg-graphite-elevated"
        >
          <img
            src={product.images[0]}
            alt=""
            className="h-11 w-11 rounded-card object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] text-ink-soft">{product.name}</p>
            <p className="text-[13px] font-semibold text-ink">
              {formatPrice(product.price, product.currency)}
            </p>
          </div>
        </Link>
      )}

      <div className="flex flex-col gap-2 px-4 py-4">
        {messages.length === 0 ? (
          <p className="py-8 text-center text-[13.5px] text-ink-faint">
            Aún no hay mensajes. Elige una pregunta rápida o escribe la tuya.
          </p>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[78%] rounded-card px-3.5 py-2.5 text-[14px] leading-relaxed ${
                m.from === "user"
                  ? "self-end bg-orbital-dim text-ink"
                  : "self-start bg-graphite text-ink-soft"
              }`}
            >
              {m.text}
            </div>
          ))
        )}
      </div>

      <div className="mt-2 flex flex-col gap-2.5 border-t border-graphite-line/60 bg-graphite-elevated/30 px-4 py-3">
        <div className="scrollbar-none flex gap-2 overflow-x-auto">
          {quickQuestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => sendText(q)}
              className="flex-shrink-0 rounded-pill border border-graphite-line bg-graphite px-3.5 py-1.5 text-[12.5px] text-ink-soft transition-colors active:bg-graphite-elevated"
            >
              {q}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendText(input)}
            placeholder="Escribe tu pregunta..."
            className="h-11 flex-1 rounded-pill border border-graphite-line bg-graphite px-4 text-[14px] text-ink outline-none placeholder:text-ink-faint"
          />
          <button
            type="button"
            onClick={() => sendText(input)}
            aria-label="Enviar"
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-pill bg-orbital text-void"
          >
            <IconBack size={20} className="rotate-180" />
          </button>
        </div>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 items-center justify-center gap-2 rounded-pill bg-whats text-[13.5px] font-semibold text-void transition-transform active:scale-[0.98]"
        >
          <IconWhatsapp size={16} />
          Continuar por WhatsApp
        </a>
      </div>
    </div>
  );
}
