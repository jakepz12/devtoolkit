"use client";

import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  color?: string;
}

export function Progress({
  value,
  max = 100,
  className,
  showLabel = false,
  color = "#00f0ff",
}: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn("w-full", className)}>
      <div
        className="h-2 w-full overflow-hidden rounded-full"
        style={{ background: "rgba(0, 240, 255, 0.1)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            boxShadow: `0 0 10px ${color}50`,
          }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-xs text-text-muted">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
}
