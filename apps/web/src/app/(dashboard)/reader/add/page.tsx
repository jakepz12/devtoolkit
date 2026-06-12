"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";

export default function AddArticlePage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<any>(null);

  const handleParse = async () => {
    if (!url) return;
    setIsLoading(true);
    setError("");

    try {
      const article = await api.addArticle(url);
      setPreview(article);
    } catch (err: any) {
      setError(err.message || "Failed to parse article");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    router.push("/reader");
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

        {error && (
          <div className="mb-4 rounded-lg bg-neon-red/10 p-3 text-sm text-neon-red">
            {error}
          </div>
        )}

        <div className="flex gap-2">
          <Input
            placeholder="https://example.com/article"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleParse} disabled={isLoading || !url}>
            {isLoading ? "Parsing..." : "Parse"}
          </Button>
        </div>

        {preview && (
          <div
            className="mt-6 rounded-lg p-4"
            style={{ background: "rgba(0, 240, 255, 0.05)" }}
          >
            <h3 className="font-semibold">{preview.title || "Untitled"}</h3>
            {preview.author && (
              <p className="mt-1 text-sm text-text-muted">
                by {preview.author}
              </p>
            )}
            <div className="mt-2 flex gap-4 text-sm text-text-secondary">
              {preview.word_count && (
                <span>{preview.word_count.toLocaleString()} words</span>
              )}
              {preview.reading_time_minutes && (
                <span>{preview.reading_time_minutes} min read</span>
              )}
            </div>
            <Button className="mt-4" size="sm" onClick={handleAdd}>
              Add to Library
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
