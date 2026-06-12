"use client";

import { useEffect, useState } from "react";

interface PortfolioStats {
  totalViews: number;
  totalProjects: number;
  totalSkills: number;
  viewsThisWeek: number;
  viewsChange: number;
}

export function PortfolioStats() {
  const [stats, setStats] = useState<PortfolioStats>({
    totalViews: 0,
    totalProjects: 0,
    totalSkills: 0,
    viewsThisWeek: 0,
    viewsChange: 0,
  });

  useEffect(() => {
    // In production, fetch from API
    setStats({
      totalViews: 1234,
      totalProjects: 12,
      totalSkills: 25,
      viewsThisWeek: 89,
      viewsChange: 12.5,
    });
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Views"
        value={stats.totalViews.toLocaleString()}
        change={`${stats.viewsChange > 0 ? "+" : ""}${stats.viewsChange}%`}
        icon="👀"
      />
      <StatCard
        label="Projects"
        value={stats.totalProjects.toString()}
        change="+2"
        icon="💼"
      />
      <StatCard
        label="Skills"
        value={stats.totalSkills.toString()}
        change="+3"
        icon="🛠️"
      />
      <StatCard
        label="Views This Week"
        value={stats.viewsThisWeek.toString()}
        change="+15%"
        icon="📈"
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  change,
  icon,
}: {
  label: string;
  value: string;
  change: string;
  icon: string;
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
