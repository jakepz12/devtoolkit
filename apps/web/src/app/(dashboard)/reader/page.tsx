"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ReaderPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Article Reader</h1>
          <p className="mt-2 text-text-secondary">
            Your reading library
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

      {/* Filters */}
      <div className="mb-6 flex gap-2">
        <Button variant="secondary" size="sm">
          All
        </Button>
        <Button variant="ghost" size="sm">
          Unread
        </Button>
        <Button variant="ghost" size="sm">
          Read
        </Button>
      </div>

      {/* Empty State */}
      <div
        className="rounded-xl p-12 text-center"
        style={{
          background: "rgba(18, 18, 26, 0.8)",
          border: "1px solid #2a2a3a",
        }}
      >
        <div className="mb-4 text-5xl">📖</div>
        <h2 className="mb-2 text-xl font-semibold">No articles yet</h2>
        <p className="mb-6 text-text-muted">
          Add an article URL to start reading.
        </p>
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
      </div>
    </div>
  );
}
