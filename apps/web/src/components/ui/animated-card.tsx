"use client";

import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function AnimatedCard({
  children,
  className,
  hover = true,
  glow = false,
  onClick,
}: AnimatedCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl transition-all duration-300",
        hover && "hover:translate-y-[-4px] hover:shadow-lg",
        glow && "hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]",
        onClick && "cursor-pointer",
        className
      )}
      style={{
        background: "rgba(18, 18, 26, 0.8)",
        backdropFilter: "blur(10px)",
        border: "1px solid #2a2a3a",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
