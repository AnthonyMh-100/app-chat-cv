"use client";

import { useActionState, useEffect, useState } from "react";
import { Project } from "../constants";
import FormField from "./form-field";
import ModalActions from "./modal-actions";
import ModalShell from "./modal-shell";
import StatusModal from "./status-modal";
import TextAreaField from "./textarea-field";
import { projectAction, GeneralState } from "@/actions/project/action-project";

type ProjectModalProps = {
  project?: Project;
  onClose: () => void;
};

const initialState: GeneralState = {
  success: false,
  message: "",
};

const emptyProject: Project = {
  id: "",
  name: "",
  description: "",
  technologies: [],
  repository: "",
  website: "",
};

export default function ProjectModal({
  project,
  onClose,
}: ProjectModalProps) {
  const [state, formAction, pending] = useActionState(
    projectAction,
    initialState,
  );

  const [form, setForm] = useState<Project>(project ?? emptyProject);
  const [techInput, setTechInput] = useState(project?.technologies.join(", ") ?? "");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.success && state.message) {
      setShowSuccess(true);
    }
  }, [state.success, state.message]);

  const updateField = <K extends keyof Project>(
    field: K,
    value: Project[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleTechChange = (value: string) => {
    setTechInput(value);
    updateField("technologies", value.split(",").map((item) => item.trim()).filter(Boolean));
  };

  return (
    <ModalShell
      title={project ? "Editar proyecto" : "Agregar proyecto"}
      onClose={onClose}
    >
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="id" value={form.id} />

        <FormField
          label="Nombre"
          name="name"
          value={form.name}
          required
          error={state.errors?.name?.[0]}
          onChange={(value) => updateField("name", value)}
        />

        <TextAreaField
          label="Descripción"
          name="description"
          value={form.description}
          required
          error={state.errors?.description?.[0]}
          onChange={(value) => updateField("description", value)}
        />

        <FormField
          label="Tecnologías"
          name="technologies"
          value={techInput}
          placeholder="Next.js, Prisma, PostgreSQL"
          error={state.errors?.technologies?.[0]}
          onChange={handleTechChange}
        />

        <FormField
          label="Repositorio"
          name="repository"
          value={form.repository}
          placeholder="https://github.com/..."
          error={state.errors?.repository?.[0]}
          onChange={(value) => updateField("repository", value)}
        />

        <FormField
          label="Sitio web"
          name="website"
          value={form.website}
          placeholder="https://..."
          error={state.errors?.website?.[0]}
          onChange={(value) => updateField("website", value)}
        />

        {state.message && !state.success && (
          <p className="text-sm text-[#d45656]">{state.message}</p>
        )}

        <ModalActions onCancel={onClose} pending={pending} />
      </form>

      <StatusModal
        open={showSuccess}
        variant="success"
        title="Proyecto guardado"
        message={state.message ?? ""}
        onConfirm={onClose}
      />
    </ModalShell>
  );
}