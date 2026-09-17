"use client";

import { useState } from "react";
import Link from "next/link";
import { formatRelativeDate } from "@/lib/format";
import type { Conversation, ConversationStatus, PublicStore } from "@/lib/types";

const statusTabs: { id: ConversationStatus | "todas"; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "activa", label: "Activas" },
  { id: "respondida", label: "Respondidas" },
  { id: "archivada", label: "Archivadas" },
];

export function ConversationList({
  conversations,
  stores,
}: {
  conversations: Conversation[];
  stores: PublicStore[];
}) {
  const [tab, setTab] = useState<ConversationStatus | "todas">("todas");
  const storeById: Record<string, PublicStore> = {};
  stores.forEach((s) => (storeById[s.id] = s));

  const filtered =
    tab === "todas" ? conversations : conversations.filter((c) => c.status === tab);
  const sorted = [...filtered].sort((a, b) =>
    a.lastMessageAt < b.lastMessageAt ? 1 : -1
  );

  return (
    <div>
      <div className="scrollbar-none sticky top-0 z-20 flex gap-2 overflow-x-auto border-b border-graphite-line/60 bg-void/90 px-4 py-2.5 backdrop-blur-xl">
        {statusTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-shrink-0 rounded-pill border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              tab === t.id
                ? "border-orbital bg-orbital-dim text-orbital-soft"
                : "border-graphite-line bg-graphite text-ink-soft"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {sorted.length === 0 ? (
        <p className="px-4 py-10 text-center text-[13.5px] text-ink-faint">
          Nada por aquí todavía.
        </p>
      ) : (
        <div className="flex flex-col">
          {sorted.map((c) => {
            const store = storeById[c.storeId];
            if (!store) return null;
            return (
              <Link
                key={c.id}
                href={`/chat?conv=${c.id}`}
                className="flex items-center gap-3 border-b border-graphite-line/40 px-4 py-3 transition-colors active:bg-graphite-elevated"
              >
                <img
                  src={store.avatarUrl}
                  alt=""
                  className="h-12 w-12 flex-shrink-0 rounded-pill object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[14px] font-semibold text-ink">
                      {store.name}
                    </p>
                    <span className="flex-shrink-0 text-[11.5px] text-ink-faint">
                      {formatRelativeDate(c.lastMessageAt)}
                    </span>
                  </div>
                  <p className="truncate text-[13px] text-ink-soft">{c.lastMessage}</p>
                </div>
                {c.unread && (
                  <span
                    aria-label="Sin leer"
                    className="h-2.5 w-2.5 flex-shrink-0 rounded-pill bg-orbital"
                  />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
