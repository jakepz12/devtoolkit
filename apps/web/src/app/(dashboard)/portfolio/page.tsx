import Link from "next/link";

export default function PortfolioPage() {
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

      {/* Empty State */}
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
    </div>
  );
}
