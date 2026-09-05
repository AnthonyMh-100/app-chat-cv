"use client";

import { useActionState, useEffect, useState } from "react";
import { Experience } from "../constants";
import CheckboxField from "./checkbox-field";
import FormField from "./form-field";
import ModalActions from "./modal-actions";
import ModalShell from "./modal-shell";
import SelectField from "./select-field";
import StatusModal from "./status-modal";
import TextAreaField from "./textarea-field";
import {
  experienceAction,
  GeneralState,
} from "@/actions/experience/action-experience";

type ExperienceModalProps = {
  experience?: Experience;
  onClose: () => void;
};

const initialState: GeneralState = {
  success: false,
  message: "",
};

const emptyExperience: Experience = {
  id: "",
  position: "",
  company: "",
  location: "",
  modality: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
  responsibilities: "",
  achievements: "",
  technologies: [],
};

export default function ExperienceModal({
  experience,
  onClose,
}: ExperienceModalProps) {
  const [state, formAction, pending] = useActionState(
    experienceAction,
    initialState,
  );

  const [form, setForm] = useState<Experience>(experience ?? emptyExperience);
  const [techInput, setTechInput] = useState(experience?.technologies.join(", ") ?? "");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.success && state.message) {
      setShowSuccess(true);
    }
  }, [state.success, state.message]);

  const updateField = <K extends keyof Experience>(
    field: K,
    value: Experience[K],
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
      title={experience ? "Editar experiencia" : "Agregar experiencia"}
      onClose={onClose}
    >
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="id" value={form.id} />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Cargo"
            name="position"
            value={form.position}
            required
            error={state.errors?.position?.[0]}
            onChange={(value) => updateField("position", value)}
          />

          <FormField
            label="Empresa"
            name="company"
            value={form.company}
            required
            error={state.errors?.company?.[0]}
            onChange={(value) => updateField("company", value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Ubicación"
            name="location"
            value={form.location}
            error={state.errors?.location?.[0]}
            onChange={(value) => updateField("location", value)}
          />

          <SelectField
            label="Modalidad"
            name="modality"
            value={form.modality}
            options={[
              { label: "Presencial", value: "Presencial" },
              { label: "Remoto", value: "Remoto" },
              { label: "Híbrido", value: "Híbrido" },
            ]}
            error={state.errors?.modality?.[0]}
            onChange={(value) => updateField("modality", value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Fecha de inicio"
            name="startDate"
            value={form.startDate}
            type="date"
            error={state.errors?.startDate?.[0]}
            onChange={(value) => updateField("startDate", value)}
          />

          <FormField
            label="Fecha de finalización"
            name="endDate"
            value={form.endDate}
            disabled={form.current}
            type="date"
            error={state.errors?.endDate?.[0]}
            onChange={(value) => updateField("endDate", value)}
          />
        </div>

        <CheckboxField
          label="Actualmente trabajo aquí"
          name="current"
          checked={form.current}
          onChange={(checked) => {
            setForm((current) => ({
              ...current,
              current: checked,
              endDate: checked ? "" : current.endDate,
            }));
          }}
        />

        <TextAreaField
          label="Descripción"
          name="description"
          value={form.description}
          error={state.errors?.description?.[0]}
          onChange={(value) => updateField("description", value)}
        />

        <TextAreaField
          label="Responsabilidades"
          name="responsibilities"
          value={form.responsibilities}
          error={state.errors?.responsibilities?.[0]}
          onChange={(value) => updateField("responsibilities", value)}
        />

        <TextAreaField
          label="Logros"
          name="achievements"
          value={form.achievements}
          error={state.errors?.achievements?.[0]}
          onChange={(value) => updateField("achievements", value)}
        />

        <FormField
          label="Tecnologías"
          name="technologies"
          value={techInput}
          placeholder="React, TypeScript, Next.js"
          error={state.errors?.technologies?.[0]}
          onChange={handleTechChange}
        />

        {state.message && !state.success && (
          <p className="text-sm text-[#d45656]">{state.message}</p>
        )}

        <ModalActions onCancel={onClose} pending={pending} />
      </form>

      <StatusModal
        open={showSuccess}
        variant="success"
        title="Experiencia guardada"
        message={state.message ?? ""}
        onConfirm={onClose}
      />
    </ModalShell>
  );
}