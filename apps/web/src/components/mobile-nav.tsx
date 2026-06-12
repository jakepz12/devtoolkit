"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/portfolio", label: "Portfolio", icon: "🎨" },
  { href: "/retro", label: "Retro", icon: "📋" },
  { href: "/reader", label: "Reader", icon: "📖" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Header */}
      <div
        className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b px-4 py-3 lg:hidden"
        style={{
          background: "rgba(18, 18, 26, 0.95)",
          backdropFilter: "blur(10px)",
          borderColor: "#2a2a3a",
        }}
      >
        <Link href="/" className="text-lg font-bold">
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

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-text-secondary hover:text-text-primary"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute left-0 top-0 h-full w-64 p-4 pt-16"
            style={{ background: "#12121a" }}
          >
            <nav>
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
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
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t py-2 lg:hidden"
        style={{
          background: "rgba(18, 18, 26, 0.95)",
          backdropFilter: "blur(10px)",
          borderColor: "#2a2a3a",
        }}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1 text-xs",
              pathname === item.href
                ? "text-neon-cyan"
                : "text-text-muted"
            )}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
