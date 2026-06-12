"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Folder {
  id: string;
  name: string;
  article_count: number;
}

interface FolderManagerProps {
  folders: Folder[];
  selectedFolder: string | null;
  onSelectFolder: (id: string | null) => void;
  onCreateFolder: (name: string) => void;
  onDeleteFolder: (id: string) => void;
}

export function FolderManager({
  folders,
  selectedFolder,
  onSelectFolder,
  onCreateFolder,
  onDeleteFolder,
}: FolderManagerProps) {
  const [newFolderName, setNewFolderName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName.trim());
      setNewFolderName("");
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-muted">FOLDERS</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCreating(!isCreating)}
        >
          {isCreating ? "Cancel" : "+ New"}
        </Button>
      </div>

      {isCreating && (
        <div className="flex gap-2">
          <Input
            placeholder="Folder name..."
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreate();
            }}
            autoFocus
          />
          <Button size="sm" onClick={handleCreate}>
            Create
          </Button>
        </div>
      )}

      <div className="space-y-1">
        <button
          onClick={() => onSelectFolder(null)}
          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
            selectedFolder === null
              ? "bg-neon-cyan/10 text-neon-cyan"
              : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
          }`}
        >
          <span>All Articles</span>
        </button>

        {folders.map((folder) => (
          <div
            key={folder.id}
            className={`group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
              selectedFolder === folder.id
                ? "bg-neon-cyan/10 text-neon-cyan"
                : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
            }`}
          >
            <button
              onClick={() => onSelectFolder(folder.id)}
              className="flex-1 text-left"
            >
              📁 {folder.name}
            </button>
            <span className="mr-2 text-xs text-text-muted">
              {folder.article_count}
            </span>
            <button
              onClick={() => onDeleteFolder(folder.id)}
              className="text-xs text-text-muted opacity-0 transition-opacity group-hover:opacity-100 hover:text-neon-red"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
