"use client";

import Link from "next/link";
import { usePortfolios } from "@/hooks/use-portfolio";
import { useArticles } from "@/hooks/use-articles";

export default function DashboardPage() {
  const { portfolios } = usePortfolios();
  const { articles } = useArticles();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-text-secondary">
          Welcome back! Here&apos;s an overview of your projects.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Link
          href="/portfolio/editor"
          className="group rounded-xl p-6 transition-all hover:translate-y-[-2px]"
          style={{
            background: "rgba(18, 18, 26, 0.8)",
            border: "1px solid #2a2a3a",
          }}
        >
          <div className="mb-2 text-2xl">🎨</div>
          <h3 className="font-semibold text-neon-cyan transition-colors group-hover:text-neon-magenta">
            New Portfolio
          </h3>
          <p className="text-sm text-text-muted">Create a new portfolio</p>
        </Link>

        <Link
          href="/retro"
          className="group rounded-xl p-6 transition-all hover:translate-y-[-2px]"
          style={{
            background: "rgba(18, 18, 26, 0.8)",
            border: "1px solid #2a2a3a",
          }}
        >
          <div className="mb-2 text-2xl">📋</div>
          <h3 className="font-semibold text-neon-cyan transition-colors group-hover:text-neon-magenta">
            Start Retro
          </h3>
          <p className="text-sm text-text-muted">Create a new retro session</p>
        </Link>

        <Link
          href="/reader/add"
          className="group rounded-xl p-6 transition-all hover:translate-y-[-2px]"
          style={{
            background: "rgba(18, 18, 26, 0.8)",
            border: "1px solid #2a2a3a",
          }}
        >
          <div className="mb-2 text-2xl">📖</div>
          <h3 className="font-semibold text-neon-cyan transition-colors group-hover:text-neon-magenta">
            Add Article
          </h3>
          <p className="text-sm text-text-muted">Save an article to read later</p>
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        <StatCard label="Portfolios" value={String(portfolios.length)} icon="🎨" change="+12%" />
        <StatCard label="Retro Sessions" value="0" icon="📋" change="0%" />
        <StatCard label="Articles" value={String(articles.length)} icon="📖" change="+5%" />
        <StatCard label="Views" value="0" icon="👀" change="0%" />
      </div>

      {/* Recent Portfolios */}
      {portfolios.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Recent Portfolios</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {portfolios.slice(0, 3).map((portfolio) => (
              <Link
                key={portfolio.id}
                href={`/portfolio/editor?id=${portfolio.id}`}
                className="group rounded-xl p-4 transition-all hover:bg-bg-tertiary"
                style={{
                  background: "rgba(18, 18, 26, 0.8)",
                  border: "1px solid #2a2a3a",
                }}
              >
                <h3 className="font-medium text-neon-cyan">{portfolio.title}</h3>
                <p className="mt-1 text-sm text-text-muted">/{portfolio.slug}</p>
                <div className="mt-2 flex items-center gap-2">
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
        </div>
      )}

      {/* Recent Articles */}
      {articles.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Recent Articles</h2>
          <div className="space-y-2">
            {articles.slice(0, 3).map((article) => (
              <div
                key={article.id}
                className="flex items-center justify-between rounded-xl p-4"
                style={{
                  background: "rgba(18, 18, 26, 0.8)",
                  border: "1px solid #2a2a3a",
                }}
              >
                <div>
                  <h3 className="font-medium">{article.title || "Untitled"}</h3>
                  <p className="text-sm text-text-muted">
                    {article.reading_time_minutes} min read
                  </p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    article.is_read
                      ? "bg-neon-green/20 text-neon-green"
                      : "bg-neon-cyan/20 text-neon-cyan"
                  }`}
                >
                  {article.is_read ? "Read" : "Unread"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity */}
      <div
        className="rounded-xl p-6"
        style={{
          background: "rgba(18, 18, 26, 0.8)",
          border: "1px solid #2a2a3a",
        }}
      >
        <h2 className="mb-4 text-lg font-semibold">Quick Tips</h2>
        <ul className="space-y-3 text-sm text-text-secondary">
          <li className="flex items-start gap-2">
            <span className="text-neon-cyan">💡</span>
            <span>Create your first portfolio to showcase your work to potential employers.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-neon-cyan">💡</span>
            <span>Use Retro Board for your next sprint retrospective with the team.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-neon-cyan">💡</span>
            <span>Save interesting articles to read later with the Article Reader.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  change,
}: {
  label: string;
  value: string;
  icon: string;
  change: string;
}) {
  const isPositive = change.startsWith("+");

  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: "rgba(18, 18, 26, 0.8)",
        border: "1px solid #2a2a3a",
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span
          className={`text-xs ${isPositive ? "text-neon-green" : "text-text-muted"}`}
        >
          {change}
        </span>
      </div>
      <div className="mt-2">
        <span className="text-2xl font-bold text-neon-cyan">{value}</span>
      </div>
      <p className="mt-1 text-sm text-text-muted">{label}</p>
    </div>
  );
}
