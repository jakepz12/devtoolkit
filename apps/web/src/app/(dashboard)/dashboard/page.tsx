import Link from "next/link";

export default function DashboardPage() {
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
          href="/reader"
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
        <StatCard label="Portfolios" value="0" icon="🎨" />
        <StatCard label="Retro Sessions" value="0" icon="📋" />
        <StatCard label="Articles" value="0" icon="📖" />
        <StatCard label="Views" value="0" icon="👀" />
      </div>

      {/* Recent Activity */}
      <div
        className="rounded-xl p-6"
        style={{
          background: "rgba(18, 18, 26, 0.8)",
          border: "1px solid #2a2a3a",
        }}
      >
        <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
        <p className="text-text-muted">
          No recent activity yet. Create your first portfolio to get started!
        </p>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
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
        <span className="text-2xl font-bold text-neon-cyan">{value}</span>
      </div>
      <p className="mt-2 text-sm text-text-muted">{label}</p>
    </div>
  );
}
