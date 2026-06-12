"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/mobile-nav";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/portfolio", label: "Portfolio", icon: "🎨" },
  { href: "/retro", label: "Retro Board", icon: "📋" },
  { href: "/reader", label: "Article Reader", icon: "📖" },
];

const bottomNavItems = [
  { href: "/profile", label: "Profile", icon: "👤" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Mobile Navigation */}
      <MobileNav />

      {/* Desktop Sidebar */}
      <aside
        className="fixed left-0 top-0 hidden h-full w-64 flex-col border-r lg:flex"
        style={{
          background: "#12121a",
          borderColor: "#2a2a3a",
        }}
      >
        {/* Logo */}
        <div className="border-b p-6" style={{ borderColor: "#2a2a3a" }}>
          <Link href="/" className="text-xl font-bold">
            <span
              style={{
                background: "linear-gradient(135deg, #00f0ff, #ff00ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DevToolKit
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    pathname === item.href
                      ? "bg-neon-cyan/10 text-neon-cyan"
                      : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
                  )}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t pt-4" style={{ borderColor: "#2a2a3a" }}>
            <ul className="space-y-1">
              {bottomNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      pathname === item.href
                        ? "bg-neon-cyan/10 text-neon-cyan"
                        : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
                    )}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* User */}
        <div className="border-t p-4" style={{ borderColor: "#2a2a3a" }}>
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium"
              style={{ background: "linear-gradient(135deg, #00f0ff, #ff00ff)" }}
            >
              J
            </div>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-text-muted">Free plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-0 flex-1 p-4 pt-16 pb-20 lg:ml-64 lg:p-8 lg:pt-8 lg:pb-8">
        {children}
      </main>
    </div>
  );
}
