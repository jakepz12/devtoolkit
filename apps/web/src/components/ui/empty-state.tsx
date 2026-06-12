import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-12 text-center",
        className
      )}
      style={{
        background: "rgba(18, 18, 26, 0.8)",
        border: "1px solid #2a2a3a",
      }}
    >
      <div className="mb-4 text-5xl">{icon}</div>
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      <p className="mb-6 text-text-muted">{description}</p>
      {action}
    </div>
  );
}
