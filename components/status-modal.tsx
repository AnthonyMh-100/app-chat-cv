"use client";

import {
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { FeedbackVariant } from "../constants";
import ModalShell from "./modal-shell";

type StatusModalProps = {
  open: boolean;
  variant: FeedbackVariant;
  title: string;
  message: string;
  confirmLabel?: string;
  pending?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
};

const variantStyles = {
  success: {
    container: "bg-[#f7fffc] text-[#00b48a]",
    button:
      "bg-[#0a0a0a] text-white hover:bg-[#222222] disabled:cursor-not-allowed disabled:opacity-50",
  },
  error: {
    container: "bg-[#fff5f5] text-[#d45656]",
    button:
      "bg-[#0a0a0a] text-white hover:bg-[#222222] disabled:cursor-not-allowed disabled:opacity-50",
  },
  confirm: {
    container: "bg-[#fff5f5] text-[#d45656]",
    button:
      "bg-[#d45656] text-white hover:bg-[#b84545] disabled:cursor-not-allowed disabled:opacity-50",
  },
} as const;

export default function StatusModal({
  open,
  variant,
  title,
  message,
  confirmLabel,
  pending = false,
  onConfirm,
  onCancel,
}: StatusModalProps) {
  if (!open) return null;

  const Icon =
    variant === "success"
      ? IoCheckmarkCircleOutline
      : variant === "error"
        ? IoAlertCircleOutline
        : IoTrashOutline;

  const defaultConfirmLabel =
    confirmLabel ?? (variant === "confirm" ? "Eliminar" : "Aceptar");

  const confirmLabelWithPending =
    pending && variant === "confirm" ? "Eliminando..." : defaultConfirmLabel;

  return (
    <ModalShell title={title} onClose={onCancel ?? onConfirm}>
      <div className="flex flex-col items-center py-2 text-center">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${variantStyles[variant].container}`}
        >
          <Icon size={26} />
        </div>

        <p className="mt-4 text-sm leading-6 text-[#5a5a5c]">{message}</p>

        <div className="mt-6 flex w-full justify-end gap-2 border-t border-[#ededed] pt-5">
          {variant === "confirm" && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={pending}
              className="rounded-md border border-[#e5e5e5] px-4 py-2.5 text-sm font-medium text-[#3a3a3c] hover:bg-[#f7f7f7] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>
          )}

          <button
            type="button"
            onClick={onConfirm}
            disabled={pending}
            className={`rounded-md px-4 py-2.5 text-sm font-medium ${variantStyles[variant].button}`}
          >
            {confirmLabelWithPending}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
