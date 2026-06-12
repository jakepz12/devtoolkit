"use client";

import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "cyan" | "magenta" | "purple";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export function GlowButton({
  children,
  className,
  variant = "cyan",
  size = "md",
  onClick,
}: GlowButtonProps) {
  const variants = {
    cyan: {
      background: "linear-gradient(135deg, #00f0ff, #00d4ff)",
      boxShadow: "0 0 20px rgba(0, 240, 255, 0.5)",
      hoverShadow: "0 0 40px rgba(0, 240, 255, 0.8)",
    },
    magenta: {
      background: "linear-gradient(135deg, #ff00ff, #ec4899)",
      boxShadow: "0 0 20px rgba(255, 0, 255, 0.5)",
      hoverShadow: "0 0 40px rgba(255, 0, 255, 0.8)",
    },
    purple: {
      background: "linear-gradient(135deg, #a855f7, #7c3aed)",
      boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)",
      hoverShadow: "0 0 40px rgba(168, 85, 247, 0.8)",
    },
  };

  const sizes = {
    sm: "h-8 px-4 text-xs",
    md: "h-10 px-6 text-sm",
    lg: "h-12 px-8 text-base",
  };

  const style = variants[variant];

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium text-black transition-all hover:scale-105",
        sizes[size],
        className
      )}
      style={{
        background: style.background,
        boxShadow: style.boxShadow,
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLElement).style.boxShadow = style.hoverShadow;
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLElement).style.boxShadow = style.boxShadow;
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
