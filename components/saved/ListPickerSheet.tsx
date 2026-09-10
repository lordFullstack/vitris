"use client";

import { useState } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { useSavedItems } from "@/lib/saved-context";

const assignableLists = [
  { id: "lo-necesito", label: "Lo necesito" },
  { id: "diciembre", label: "Diciembre" },
  { id: "verano", label: "Verano" },
];

export function ListPickerSheet({
  open,
  onClose,
  productId,
  customLists,
  onCreateList,
}: {
  open: boolean;
  onClose: () => void;
  productId: string | null;
  customLists: string[];
  onCreateList: (name: string) => void;
}) {
  const { setList } = useSavedItems();
  const [newListName, setNewListName] = useState("");

  function choose(listId: string) {
    if (productId) setList(productId, listId);
    onClose();
  }

  function handleCreate() {
    const name = newListName.trim();
    if (!name) return;
    onCreateList(name);
    choose(name);
    setNewListName("");
  }

  return (
    <BottomSheet open={open} onClose={onClose} title="Mover a lista">
      <div className="flex flex-col gap-2">
        <button
          onClick={() => choose("general")}
          className="rounded-pill border border-graphite-line bg-graphite px-4 py-2.5 text-left text-[14px] text-ink"
        >
          Sin lista (solo Todos)
        </button>
        {assignableLists.map((l) => (
          <button
            key={l.id}
            onClick={() => choose(l.id)}
            className="rounded-pill border border-graphite-line bg-graphite px-4 py-2.5 text-left text-[14px] text-ink"
          >
            {l.label}
          </button>
        ))}
        {customLists.map((l) => (
          <button
            key={l}
            onClick={() => choose(l)}
            className="rounded-pill border border-graphite-line bg-graphite px-4 py-2.5 text-left text-[14px] text-ink"
          >
            {l}
          </button>
        ))}
        <div className="mt-2 flex gap-2">
          <input
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Nueva lista..."
            className="flex-1 rounded-pill border border-graphite-line bg-graphite px-4 py-2.5 text-[14px] text-ink placeholder:text-ink-faint outline-none"
          />
          <button
            onClick={handleCreate}
            className="rounded-pill bg-orbital px-4 py-2.5 text-[13.5px] font-semibold text-void"
          >
            Crear
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}
