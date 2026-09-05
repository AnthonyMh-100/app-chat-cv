"use client";

import { IoAddOutline } from "react-icons/io5";

type SectionHeaderProps = {
  title: string;
  description: string;
  onAdd?: () => void;
  actionLabel?: string;
};

export default function SectionHeader({
  title,
  description,
  onAdd,
  actionLabel,
}: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-sm font-semibold text-[#0a0a0a]">{title}</h2>
        <p className="mt-1 text-sm text-[#888888]">{description}</p>
      </div>

      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="flex shrink-0 items-center gap-2 rounded-md border border-[#e5e5e5] bg-white px-3 py-2 text-sm font-medium text-[#0a0a0a] transition hover:bg-[#f7f7f7]"
        >
          <IoAddOutline size={17} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
