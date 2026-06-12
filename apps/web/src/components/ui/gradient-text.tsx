import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: "neon" | "cyber" | "matrix";
}

export function GradientText({
  children,
  className,
  gradient = "neon",
}: GradientTextProps) {
  const gradients = {
    neon: "linear-gradient(135deg, #00f0ff, #ff00ff)",
    cyber: "linear-gradient(135deg, #a855f7, #ec4899)",
    matrix: "linear-gradient(180deg, #00ff88, #00f0ff)",
  };

  return (
    <span
      className={cn("bg-clip-text text-transparent", className)}
      style={{
        background: gradients[gradient],
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}
