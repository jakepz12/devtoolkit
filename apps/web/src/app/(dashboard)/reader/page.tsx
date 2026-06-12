"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useArticles } from "@/hooks/use-articles";
import { TagManager } from "@/components/reader/tag-manager";
import { FolderManager } from "@/components/reader/folder-manager";

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface Folder {
  id: string;
  name: string;
  article_count: number;
}

export default function ReaderPage() {
  const { articles, isLoading, deleteArticle } = useArticles();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "grid">("list");

  // Mock tags and folders
  const [tags, setTags] = useState<Tag[]>([
    { id: "1", name: "Tech", color: "#00f0ff" },
    { id: "2", name: "Design", color: "#ff00ff" },
    { id: "3", name: "Business", color: "#a855f7" },
  ]);

  const [folders, setFolders] = useState<Folder[]>([
    { id: "1", name: "Reading List", article_count: 5 },
    { id: "2", name: "Favorites", article_count: 3 },
  ]);

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      !searchQuery ||
      a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleAddTag = (name: string) => {
    const newTag: Tag = {
      id: `tag-${Date.now()}`,
      name,
      color: "#00f0ff",
    };
    setTags((prev) => [...prev, newTag]);
  };

  const handleRemoveTag = (id: string) => {
    setTags((prev) => prev.filter((t) => t.id !== id));
    setSelectedTags((prev) => prev.filter((t) => t !== id));
  };

  const handleToggleTag = (id: string) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleCreateFolder = (name: string) => {
    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name,
      article_count: 0,
    };
    setFolders((prev) => [...prev, newFolder]);
  };

  const handleDeleteFolder = (id: string) => {
    setFolders((prev) => prev.filter((f) => f.id !== id));
    if (selectedFolder === id) setSelectedFolder(null);
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Article Reader</h1>
          <p className="mt-2 text-text-secondary">
            Your reading library ({articles.length} articles)
          </p>
        </div>
        <Link
          href="/reader/add"
          className="inline-flex h-10 items-center rounded-lg px-6 text-sm font-medium text-black transition-all hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #00f0ff, #ff00ff)",
            boxShadow: "0 0 20px rgba(0, 240, 255, 0.5)",
          }}
        >
          + Add Article
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Search */}
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Folders */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "rgba(18, 18, 26, 0.8)",
              border: "1px solid #2a2a3a",
            }}
          >
            <FolderManager
              folders={folders}
              selectedFolder={selectedFolder}
              onSelectFolder={setSelectedFolder}
              onCreateFolder={handleCreateFolder}
              onDeleteFolder={handleDeleteFolder}
            />
          </div>

          {/* Tags */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "rgba(18, 18, 26, 0.8)",
              border: "1px solid #2a2a3a",
            }}
          >
            <TagManager
              tags={tags}
              selectedTags={selectedTags}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
              onToggleTag={handleToggleTag}
            />
          </div>
        </div>

        {/* Articles List */}
        <div className="lg:col-span-3">
          {/* View Toggle */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={view === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setView("list")}
              >
                ☰ List
              </Button>
              <Button
                variant={view === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setView("grid")}
              >
                ⊞ Grid
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                All
              </Button>
              <Button variant="ghost" size="sm">
                Unread
              </Button>
              <Button variant="ghost" size="sm">
                Read
              </Button>
            </div>
          </div>

          {/* Articles */}
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-xl"
                  style={{
                    background: "rgba(18, 18, 26, 0.8)",
                    border: "1px solid #2a2a3a",
                  }}
                />
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div
              className="rounded-xl p-12 text-center"
              style={{
                background: "rgba(18, 18, 26, 0.8)",
                border: "1px solid #2a2a3a",
              }}
            >
              <div className="mb-4 text-5xl">📖</div>
              <h2 className="mb-2 text-xl font-semibold">
                {searchQuery ? "No articles found" : "No articles yet"}
              </h2>
              <p className="mb-6 text-text-muted">
                {searchQuery
                  ? "Try a different search query"
                  : "Add an article URL to start reading."}
              </p>
              {!searchQuery && (
                <Link
                  href="/reader/add"
                  className="inline-flex h-10 items-center rounded-lg px-6 text-sm font-medium text-black transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #00f0ff, #ff00ff)",
                    boxShadow: "0 0 20px rgba(0, 240, 255, 0.5)",
                  }}
                >
                  Add Article
                </Link>
              )}
            </div>
          ) : view === "list" ? (
            <div className="space-y-3">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="group flex items-center justify-between rounded-xl p-4 transition-all hover:bg-bg-tertiary"
                  style={{
                    background: "rgba(18, 18, 26, 0.8)",
                    border: "1px solid #2a2a3a",
                  }}
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-text-primary">
                      {article.title || "Untitled"}
                    </h3>
                    <p className="mt-1 text-sm text-text-muted">
                      {article.author && `by ${article.author} · `}
                      {article.reading_time_minutes} min read
                      {article.word_count &&
                        ` · ${article.word_count.toLocaleString()} words`}
                    </p>
                    {article.read_progress > 0 && (
                      <div className="mt-2 h-1 w-32 overflow-hidden rounded-full bg-bg-tertiary">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${article.read_progress * 100}%`,
                            background:
                              "linear-gradient(90deg, #00f0ff, #ff00ff)",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {article.is_read ? (
                      <span className="rounded-full bg-neon-green/20 px-2 py-0.5 text-xs text-neon-green">
                        Read
                      </span>
                    ) : (
                      <span className="rounded-full bg-neon-cyan/20 px-2 py-0.5 text-xs text-neon-cyan">
                        Unread
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteArticle(article.id)}
                      className="text-text-muted hover:text-neon-red"
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="group rounded-xl p-4 transition-all hover:translate-y-[-2px]"
                  style={{
                    background: "rgba(18, 18, 26, 0.8)",
                    border: "1px solid #2a2a3a",
                  }}
                >
                  <h3 className="font-medium text-text-primary">
                    {article.title || "Untitled"}
                  </h3>
                  <p className="mt-1 text-sm text-text-muted">
                    {article.author && `by ${article.author}`}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-text-muted">
                      {article.reading_time_minutes} min
                    </span>
                    {article.is_read ? (
                      <span className="rounded-full bg-neon-green/20 px-2 py-0.5 text-xs text-neon-green">
                        Read
                      </span>
                    ) : (
                      <span className="rounded-full bg-neon-cyan/20 px-2 py-0.5 text-xs text-neon-cyan">
                        Unread
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
