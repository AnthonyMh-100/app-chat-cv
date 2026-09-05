"use client";

import { IoCloseOutline } from "react-icons/io5";
import { ReactNode } from "react";

type ModalShellProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export default function ModalShell({
  title,
  children,
  onClose,
}: ModalShellProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="flex max-h-[90vh] w-full max-w-155 flex-col overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#e5e5e5] px-5 py-4">
          <h2 className="text-base font-semibold text-[#0a0a0a]">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-[#888888] hover:bg-[#f7f7f7] hover:text-[#0a0a0a]"
          >
            <IoCloseOutline size={21} />
          </button>
        </div>

        <div className="overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}
