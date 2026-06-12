"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface TagManagerProps {
  tags: Tag[];
  selectedTags: string[];
  onAddTag: (name: string) => void;
  onRemoveTag: (id: string) => void;
  onToggleTag: (id: string) => void;
}

const tagColors = [
  "#00f0ff",
  "#ff00ff",
  "#a855f7",
  "#ec4899",
  "#00ff88",
  "#ffff00",
  "#ff3366",
];

export function TagManager({
  tags,
  selectedTags,
  onAddTag,
  onRemoveTag,
  onToggleTag,
}: TagManagerProps) {
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState(tagColors[0]);

  const handleAddTag = () => {
    if (newTagName.trim()) {
      onAddTag(newTagName.trim());
      setNewTagName("");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-text-muted">TAGS</h3>

      {/* Add new tag */}
      <div className="flex gap-2">
        <Input
          placeholder="New tag..."
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTag();
          }}
          className="flex-1"
        />
        <div className="flex gap-1">
          {tagColors.slice(0, 4).map((color) => (
            <button
              key={color}
              onClick={() => setNewTagColor(color)}
              className={`h-6 w-6 rounded-full ${
                newTagColor === color ? "ring-2 ring-white" : ""
              }`}
              style={{ background: color }}
            />
          ))}
        </div>
        <Button size="sm" onClick={handleAddTag}>
          Add
        </Button>
      </div>

      {/* Tags list */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs transition-all ${
              selectedTags.includes(tag.id)
                ? "ring-2 ring-white"
                : "opacity-70 hover:opacity-100"
            }`}
            style={{
              background: `${tag.color}20`,
              color: tag.color,
            }}
          >
            <button onClick={() => onToggleTag(tag.id)}>{tag.name}</button>
            <button
              onClick={() => onRemoveTag(tag.id)}
              className="ml-1 hover:text-neon-red"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
