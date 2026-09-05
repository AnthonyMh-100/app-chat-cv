"use client";

import { useTransition } from "react";
import { IoCloseOutline } from "react-icons/io5";

type SkillTagProps = {
  skill: string;
  onRemove: () => void | Promise<void>;
};

export default function SkillTag({ skill, onRemove }: SkillTagProps) {
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(async () => {
      await onRemove();
    });
  };

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[#e5e5e5] bg-[#fafafa] px-3 py-1.5 text-sm text-[#3a3a3c]">
      {skill}

      <button
        type="button"
        onClick={handleRemove}
        disabled={isPending}
        className="text-[#888888] transition hover:text-[#d45656] disabled:opacity-50"
        aria-label={`Eliminar ${skill}`}
      >
        <IoCloseOutline size={15} />
      </button>
    </span>
  );
}