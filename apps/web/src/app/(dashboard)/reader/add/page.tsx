"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddArticlePage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<{
    title: string;
    author: string;
    wordCount: number;
    readingTime: number;
  } | null>(null);

  const handleParse = async () => {
    if (!url) return;
    setIsLoading(true);

    // Simulate parsing
    setTimeout(() => {
      setPreview({
        title: "Article Title",
        author: "Author Name",
        wordCount: 2400,
        readingTime: 12,
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/reader"
            className="text-text-secondary hover:text-text-primary"
          >
            ← Back
          </Link>
          <h1 className="text-2xl font-bold">Add Article</h1>
        </div>
      </div>

      <div
        className="mx-auto max-w-2xl rounded-xl p-8"
        style={{
          background: "rgba(18, 18, 26, 0.8)",
          border: "1px solid #2a2a3a",
        }}
      >
        <h2 className="mb-6 text-lg font-semibold">Paste Article URL</h2>

        <div className="flex gap-2">
          <Input
            placeholder="https://example.com/article"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleParse} disabled={isLoading || !url}>
            {isLoading ? "Parsing..." : "Parse"}
          </Button>
        </div>

        {preview && (
          <div className="mt-6 rounded-lg p-4" style={{ background: "rgba(0, 240, 255, 0.05)" }}>
            <h3 className="font-semibold">{preview.title}</h3>
            <p className="mt-1 text-sm text-text-muted">by {preview.author}</p>
            <div className="mt-2 flex gap-4 text-sm text-text-secondary">
              <span>{preview.wordCount.toLocaleString()} words</span>
              <span>{preview.readingTime} min read</span>
            </div>
            <Button className="mt-4" size="sm">
              Add to Library
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
