"use client";

type ModalActionsProps = {
  onCancel: () => void;
  submitLabel?: string;
  pending?: boolean;
};

export default function ModalActions({
  onCancel,
  submitLabel = "Guardar",
  pending = false,
}: ModalActionsProps) {
  return (
    <div className="flex justify-end gap-2 border-t border-[#ededed] pt-5">
      <button
        type="button"
        onClick={onCancel}
        disabled={pending}
        className="rounded-md border border-[#e5e5e5] px-4 py-2.5 text-sm font-medium text-[#3a3a3c] hover:bg-[#f7f7f7] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Cancelar
      </button>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-[#0a0a0a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#222222] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Guardando..." : submitLabel}
      </button>
    </div>
  );
}
