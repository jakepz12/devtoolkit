"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Card {
  id: string;
  content: string;
  votes: number;
  authorSession: string;
}

interface Column {
  id: string;
  title: string;
  color: string;
  cards: Card[];
}

interface RetroBoardProps {
  template: string;
  onExport?: () => void;
}

const templateColumns: Record<string, string[]> = {
  start_stop_continue: ["Start", "Stop", "Continue"],
  "4ls": ["Liked", "Learned", "Lacked", "Longed for"],
  mad_sad_glad: ["Mad", "Sad", "Glad"],
  sailboat: ["Wind", "Island", "Rocks", "Anchor"],
};

const columnColors: Record<string, string> = {
  Start: "#00ff88",
  Stop: "#ff3366",
  Continue: "#00f0ff",
  Liked: "#00ff88",
  Learned: "#00f0ff",
  Lacked: "#ffff00",
  "Longed for": "#a855f7",
  Mad: "#ff3366",
  Sad: "#00f0ff",
  Glad: "#00ff88",
  Wind: "#00f0ff",
  Island: "#00ff88",
  Rocks: "#ff3366",
  Anchor: "#ffff00",
};

export function RetroBoard({ template, onExport }: RetroBoardProps) {
  const [columns, setColumns] = useState<Column[]>(
    (templateColumns[template] || templateColumns.start_stop_continue).map(
      (title, i) => ({
        id: `col-${i}`,
        title,
        color: columnColors[title] || "#00f0ff",
        cards: [
          {
            id: `card-${i}-1`,
            content: `Example card for ${title}`,
            votes: 0,
            authorSession: "demo",
          },
        ],
      })
    )
  );

  const [newCardText, setNewCardText] = useState("");
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [draggedCard, setDraggedCard] = useState<Card | null>(null);

  const addCard = (columnId: string) => {
    if (!newCardText.trim()) return;

    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: [
                ...col.cards,
                {
                  id: `card-${Date.now()}`,
                  content: newCardText,
                  votes: 0,
                  authorSession: "anonymous",
                },
              ],
            }
          : col
      )
    );
    setNewCardText("");
    setActiveColumn(null);
  };

  const voteCard = (columnId: string, cardId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.map((card) =>
                card.id === cardId ? { ...card, votes: card.votes + 1 } : card
              ),
            }
          : col
      )
    );
  };

  const deleteCard = (columnId: string, cardId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
          : col
      )
    );
  };

  const handleDragStart = (card: Card, columnId: string) => {
    setDraggedCard({ ...card, columnId } as any);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetColumnId: string) => {
    if (!draggedCard) return;

    const sourceColumnId = (draggedCard as any).columnId;

    if (sourceColumnId === targetColumnId) {
      setDraggedCard(null);
      return;
    }

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === sourceColumnId) {
          return {
            ...col,
            cards: col.cards.filter((c) => c.id !== draggedCard.id),
          };
        }
        if (col.id === targetColumnId) {
          return {
            ...col,
            cards: [...col.cards, { ...draggedCard, votes: 0 }],
          };
        }
        return col;
      })
    );

    setDraggedCard(null);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={onExport}>
            📄 Export PDF
          </Button>
          <Button variant="ghost" size="sm">
            ⏱️ Timer
          </Button>
        </div>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex flex-col rounded-xl p-4"
            style={{
              background: "rgba(18, 18, 26, 0.8)",
              border: "1px solid #2a2a3a",
              minHeight: "400px",
            }}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
          >
            <div className="mb-4 flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ background: column.color }}
              />
              <h3 className="font-semibold" style={{ color: column.color }}>
                {column.title}
              </h3>
              <span className="ml-auto text-xs text-text-muted">
                {column.cards.length}
              </span>
            </div>

            <div className="flex-1 space-y-2">
              {column.cards.map((card) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => handleDragStart(card, column.id)}
                  className="group cursor-move rounded-lg p-3 transition-all hover:translate-y-[-2px]"
                  style={{
                    background: "rgba(0, 240, 255, 0.05)",
                    border: "1px solid rgba(0, 240, 255, 0.1)",
                  }}
                >
                  <p className="text-sm">{card.content}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      onClick={() => voteCard(column.id, card.id)}
                      className="flex items-center gap-1 text-xs text-neon-cyan hover:text-neon-magenta"
                    >
                      ▲ {card.votes}
                    </button>
                    <button
                      onClick={() => deleteCard(column.id, card.id)}
                      className="text-xs text-text-muted opacity-0 transition-opacity group-hover:opacity-100 hover:text-neon-red"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {activeColumn === column.id ? (
              <div className="mt-2">
                <Input
                  placeholder="Your card..."
                  value={newCardText}
                  onChange={(e) => setNewCardText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addCard(column.id);
                    if (e.key === "Escape") setActiveColumn(null);
                  }}
                  autoFocus
                  className="mb-2"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => addCard(column.id)}>
                    Add
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setActiveColumn(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 w-full"
                onClick={() => setActiveColumn(column.id)}
              >
                + Add card
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
