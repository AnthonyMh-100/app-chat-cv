"use client";

import { useActionState, useRef, useState } from "react";
import { IoBriefcaseOutline, IoLocationOutline } from "react-icons/io5";
import { Experience } from "../constants";
import ActionButtons from "./action-buttons";
import StatusModal from "./status-modal";
import { deleteExperienceAction, GeneralState } from "@/actions/experience/action-experience";

type ExperienceCardProps = {
  experience: Experience;
  onEdit: () => void;
};

const initialState: GeneralState = {
  success: false,
  message: "",
};

export default function ExperienceCard({
  experience,
  onEdit,
}: ExperienceCardProps) {
  const [, deleteAction, pending] = useActionState(
    deleteExperienceAction,
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
              <IoBriefcaseOutline size={20} />
            </div>

            <div>
              <h3 className="font-medium text-[#0a0a0a]">
                {experience.position}
              </h3>
              <p className="mt-1 text-sm text-[#5a5a5c]">{experience.company}</p>

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#888888]">
                <span>
                  {experience.startDate} -{" "}
                  {experience.current ? "Actualidad" : experience.endDate}
                </span>

                {experience.location && (
                  <span className="flex items-center gap-1">
                    <IoLocationOutline size={14} />
                    {experience.location}
                  </span>
                )}

                {experience.modality && <span>{experience.modality}</span>}
              </div>
            </div>
          </div>

          <ActionButtons
            onEdit={onEdit}
            onDelete={() => setConfirmOpen(true)}
            disabled={pending}
          />
        </div>

        {experience.description && (
          <p className="mt-4 text-sm leading-6 text-[#5a5a5c]">
            {experience.description}
          </p>
        )}

        {experience.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {experience.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full bg-[#f7f7f7] px-2.5 py-1 text-xs text-[#5a5a5c]"
              >
                {technology}
              </span>
            ))}
          </div>
        )}

        <input type="hidden" name="id" value={experience.id} />
      </form>

      <StatusModal
        open={confirmOpen}
        variant="confirm"
        title="Eliminar experiencia"
        message="¿Estás seguro de eliminar esta experiencia? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        pending={pending}
        onConfirm={() => formRef.current?.requestSubmit()}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}