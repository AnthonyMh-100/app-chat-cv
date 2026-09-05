"use client";

import { useActionState, useRef, useState } from "react";
import { IoLanguageOutline } from "react-icons/io5";
import { Language } from "../constants";
import ActionButtons from "./action-buttons";
import StatusModal from "./status-modal";
import { deleteLanguageAction, GeneralState } from "@/actions/language/action-language";

type LanguageRowProps = {
  language: Language;
  onEdit: () => void;
};

const initialState: GeneralState = {
  success: false,
  message: "",
};

export default function LanguageRow({
  language,
  onEdit,
}: LanguageRowProps) {
  const [, deleteAction, pending] = useActionState(
    deleteLanguageAction,
    initialState,
  );

  const formRef = useRef<HTMLFormElement>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
    <form ref={formRef} action={deleteAction}>
      <div className="flex items-center justify-between px-4 gap-4 border-b border-[#ededed] py-4 last:border-b-0">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#f7f7f7] text-[#3a3a3c]">
            <IoLanguageOutline size={18} />
          </div>

          <div>
            <p className="text-sm font-medium text-[#0a0a0a]">
              {language.language}
            </p>
            <p className="mt-0.5 text-xs text-[#888888]">{language.level}</p>
          </div>
        </div>

        <ActionButtons
          onEdit={onEdit}
          onDelete={() => setConfirmOpen(true)}
          disabled={pending}
        />
      </div>
      <input type="hidden" name="id" value={language.id} />
    </form>

    <StatusModal
      open={confirmOpen}
      variant="confirm"
      title="Eliminar idioma"
      message="¿Estás seguro de eliminar este idioma? Esta acción no se puede deshacer."
      confirmLabel="Eliminar"
      pending={pending}
      onConfirm={() => formRef.current?.requestSubmit()}
      onCancel={() => setConfirmOpen(false)}
    />
    </>
  );
}