"use client";

import Link from "next/link";
import { usePortfolios } from "@/hooks/use-portfolio";
import { Button } from "@/components/ui/button";

export default function PortfolioPage() {
  const { portfolios, isLoading, error } = usePortfolios();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <p className="mt-2 text-text-secondary">
            Manage your portfolios
          </p>
        </div>
        <Link
          href="/portfolio/editor"
          className="inline-flex h-10 items-center rounded-lg px-6 text-sm font-medium text-black transition-all hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #00f0ff, #ff00ff)",
            boxShadow: "0 0 20px rgba(0, 240, 255, 0.5)",
          }}
        >
          + New Portfolio
        </Link>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-xl"
              style={{
                background: "rgba(18, 18, 26, 0.8)",
                border: "1px solid #2a2a3a",
              }}
            />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-xl p-6 text-center text-neon-red">
          {error}
        </div>
      ) : portfolios.length === 0 ? (
        <div
          className="rounded-xl p-12 text-center"
          style={{
            background: "rgba(18, 18, 26, 0.8)",
            border: "1px solid #2a2a3a",
          }}
        >
          <div className="mb-4 text-5xl">🎨</div>
          <h2 className="mb-2 text-xl font-semibold">No portfolios yet</h2>
          <p className="mb-6 text-text-muted">
            Create your first portfolio to showcase your work.
          </p>
          <Link
            href="/portfolio/editor"
            className="inline-flex h-10 items-center rounded-lg px-6 text-sm font-medium text-black transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #00f0ff, #ff00ff)",
              boxShadow: "0 0 20px rgba(0, 240, 255, 0.5)",
            }}
          >
            Create Portfolio
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolios.map((portfolio) => (
            <Link
              key={portfolio.id}
              href={`/portfolio/editor?id=${portfolio.id}`}
              className="group rounded-xl p-6 transition-all hover:translate-y-[-2px]"
              style={{
                background: "rgba(18, 18, 26, 0.8)",
                border: "1px solid #2a2a3a",
              }}
            >
              <h3 className="font-semibold text-neon-cyan transition-colors group-hover:text-neon-magenta">
                {portfolio.title}
              </h3>
              <p className="mt-1 text-sm text-text-muted">
                /{portfolio.slug}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    portfolio.is_public
                      ? "bg-neon-green/20 text-neon-green"
                      : "bg-bg-tertiary text-text-muted"
                  }`}
                >
                  {portfolio.is_public ? "Public" : "Private"}
                </span>
                <span className="text-xs text-text-muted">
                  {portfolio.views_count} views
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
