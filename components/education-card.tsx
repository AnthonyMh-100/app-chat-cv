"use client";

import { useActionState, useRef, useState } from "react";
import { IoSchoolOutline } from "react-icons/io5";
import { Education } from "../constants";
import ActionButtons from "./action-buttons";
import StatusModal from "./status-modal";
import { deleteEducationAction, GeneralState } from "@/actions/education/action-education";

type EducationCardProps = {
  education: Education;
  onEdit: () => void;
};

const initialState: GeneralState = {
  success: false,
  message: "",
};

export default function EducationCard({
  education,
  onEdit,
}: EducationCardProps) {
  const [, deleteAction, pending] = useActionState(
    deleteEducationAction,
    initialState,
  );

  const formRef = useRef<HTMLFormElement>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="rounded-lg border border-[#e5e5e5] bg-white p-5">
      <form ref={formRef} action={deleteAction}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#f7f7f7] text-[#3a3a3c]">
              <IoSchoolOutline size={20} />
            </div>

            <div>
              <h3 className="font-medium text-[#0a0a0a]">{education.degree}</h3>

              <p className="mt-1 text-sm text-[#5a5a5c]">
                {education.institution}
              </p>

              <div className="mt-2 flex flex-wrap gap-3 text-xs text-[#888888]">
                <span>
                  {education.startDate} -{" "}
                  {education.current ? "Actualidad" : education.endDate}
                </span>

                {education.location && <span>{education.location}</span>}
              </div>
            </div>
          </div>

          <ActionButtons
            onEdit={onEdit}
            onDelete={() => setConfirmOpen(true)}
            disabled={pending}
          />
        </div>

        {education.description && (
          <p className="mt-4 text-sm leading-6 text-[#5a5a5c]">
            {education.description}
          </p>
        )}

        <input type="hidden" name="id" value={education.id} />
      </form>

      <StatusModal
        open={confirmOpen}
        variant="confirm"
        title="Eliminar educación"
        message="¿Estás seguro de eliminar esta educación? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        pending={pending}
        onConfirm={() => formRef.current?.requestSubmit()}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}