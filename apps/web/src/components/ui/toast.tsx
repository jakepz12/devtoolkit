"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ToastProps {
  type: "success" | "error" | "info";
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ type, message, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  };

  const colors = {
    success: "text-neon-green",
    error: "text-neon-red",
    info: "text-neon-cyan",
  };

  const bgColors = {
    success: "bg-neon-green/10 border-neon-green/30",
    error: "bg-neon-red/10 border-neon-red/30",
    info: "bg-neon-cyan/10 border-neon-cyan/30",
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg border p-4",
        bgColors[type]
      )}
    >
      <span className={colors[type]}>{icons[type]}</span>
      <span className="text-sm text-text-primary">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-text-muted hover:text-text-primary"
      >
        ✕
      </button>
    </div>
  );
}
