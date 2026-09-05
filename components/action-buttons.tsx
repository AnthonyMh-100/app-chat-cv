"use client";

import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";

type ActionButtonsProps = {
  onEdit: () => void;
  onDelete: () => void;
  disabled?: boolean;
};

export default function ActionButtons({
  onEdit,
  onDelete,
  disabled = false,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onEdit}
        disabled={disabled}
        className="rounded-md p-2 text-[#888888] transition hover:bg-[#f7f7f7] hover:text-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Editar"
      >
        <IoCreateOutline size={17} />
      </button>

      <button
        type="button"
        onClick={onDelete}
        disabled={disabled}
        className="rounded-md p-2 text-[#888888] transition hover:bg-[#fff5f5] hover:text-[#d45656] disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Eliminar"
      >
        <IoTrashOutline size={17} />
      </button>
    </div>
  );
}