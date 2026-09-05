"use client";

import { useActionState, useRef, useState } from "react";
import { IoCodeSlashOutline, IoGlobeOutline } from "react-icons/io5";
import { Project } from "../constants";
import ActionButtons from "./action-buttons";
import StatusModal from "./status-modal";
import { deleteProjectAction, GeneralState } from "@/actions/project/action-project";

type ProjectCardProps = {
  project: Project;
  onEdit: () => void;
};

const initialState: GeneralState = {
  success: false,
  message: "",
};

export default function ProjectCard({
  project,
  onEdit,
}: ProjectCardProps) {
  const [, deleteAction, pending] = useActionState(
    deleteProjectAction,
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
              <IoCodeSlashOutline size={20} />
            </div>

            <div>
              <h3 className="font-medium text-[#0a0a0a]">{project.name}</h3>
              <p className="mt-2 text-sm leading-6 text-[#5a5a5c]">
                {project.description}
              </p>
            </div>
          </div>

          <ActionButtons
            onEdit={onEdit}
            onDelete={() => setConfirmOpen(true)}
            disabled={pending}
          />
        </div>

        {project.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full bg-[#f7f7f7] px-2.5 py-1 text-xs text-[#5a5a5c]"
              >
                {technology}
              </span>
            ))}
          </div>
        )}

        {(project.repository || project.website) && (
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {project.repository && (
              <a
                href={project.repository}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[#5a5a5c] hover:text-[#0a0a0a]"
              >
                <IoCodeSlashOutline size={16} />
                Repositorio
              </a>
            )}

            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[#5a5a5c] hover:text-[#0a0a0a]"
              >
                <IoGlobeOutline size={16} />
                Sitio web
              </a>
            )}
          </div>
        )}

        <input type="hidden" name="id" value={project.id} />
      </form>

      <StatusModal
        open={confirmOpen}
        variant="confirm"
        title="Eliminar proyecto"
        message="¿Estás seguro de eliminar este proyecto? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        pending={pending}
        onConfirm={() => formRef.current?.requestSubmit()}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}