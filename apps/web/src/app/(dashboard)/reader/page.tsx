"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useArticles } from "@/hooks/use-articles";

export default function ReaderPage() {
  const { articles, isLoading, deleteArticle } = useArticles();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(
    (a) =>
      a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Articles List */}
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
      ) : (
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
                        background: "linear-gradient(90deg, #00f0ff, #ff00ff)",
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
      )}
    </div>
  );
}
