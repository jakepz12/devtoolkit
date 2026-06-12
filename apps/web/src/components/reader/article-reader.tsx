"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface ArticleReaderProps {
  title: string;
  content: string;
  author?: string;
  wordCount?: number;
  readingTime?: number;
  onProgressUpdate?: (progress: number) => void;
}

export function ArticleReader({
  title,
  content,
  author,
  wordCount,
  readingTime,
  onProgressUpdate,
}: ArticleReaderProps) {
  const [progress, setProgress] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const element = contentRef.current;
      const scrollTop = window.scrollY;
      const scrollHeight = element.scrollHeight - window.innerHeight;
      const currentProgress = Math.min(scrollTop / scrollHeight, 1);

      setProgress(currentProgress);
      onProgressUpdate?.(currentProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onProgressUpdate]);

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress Bar */}
      <div className="fixed left-0 right-0 top-0 z-50 h-1">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${progress * 100}%`,
            background: "linear-gradient(90deg, #00f0ff, #ff00ff)",
          }}
        />
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            {author && <span>by {author}</span>}
            {wordCount && (
              <>
                <span>·</span>
                <span>{wordCount.toLocaleString()} words</span>
              </>
            )}
            {readingTime && (
              <>
                <span>·</span>
                <span>{readingTime} min read</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFontSize((s) => Math.max(14, s - 2))}
            >
              A-
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFontSize((s) => Math.min(24, s + 2))}
            >
              A+
            </Button>
          </div>
        </div>

        <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="prose prose-invert max-w-none"
        style={{ fontSize: `${fontSize}px`, lineHeight: "1.8" }}
      >
        {content.split("\n").map((paragraph, i) => (
          <p key={i} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 border-t pt-8" style={{ borderColor: "#2a2a3a" }}>
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-muted">
            {Math.round(progress * 100)}% read
          </span>
          {progress >= 0.9 && (
            <span className="text-sm text-neon-green">✓ Completed</span>
          )}
        </div>
      </div>
    </div>
  );
}
