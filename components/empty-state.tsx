"use client";

type EmptyStateProps = {
  message: string;
  action?: string;
  onAction?: () => void;
};

export default function EmptyState({
  message,
  action,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-[#e5e5e5] bg-[#fafafa] px-6 py-10 text-center">
      <p className="text-sm text-[#888888]">{message}</p>

      {action && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 text-sm font-medium text-[#00b48a] hover:underline"
        >
          {action}
        </button>
      )}
    </div>
  );
}
