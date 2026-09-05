"use client";

import { useActionState, useEffect, useState } from "react";
import { Education } from "../constants";
import CheckboxField from "./checkbox-field";
import FormField from "./form-field";
import ModalActions from "./modal-actions";
import ModalShell from "./modal-shell";
import StatusModal from "./status-modal";
import TextAreaField from "./textarea-field";
import {
  educationAction,
  GeneralState,
} from "@/actions/education/action-education";

type EducationModalProps = {
  education?: Education;
  onClose: () => void;
};

const initialState: GeneralState = {
  success: false,
  message: "",
};

const emptyEducation: Education = {
  id: "",
  degree: "",
  institution: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
};

export default function EducationModal({
  education,
  onClose,
}: EducationModalProps) {
  const [state, formAction, pending] = useActionState(
    educationAction,
    initialState,
  );

  const [form, setForm] = useState<Education>(education ?? emptyEducation);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.success && state.message) {
      setShowSuccess(true);
    }
  }, [state.success, state.message]);

  const updateField = <K extends keyof Education>(
    field: K,
    value: Education[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <ModalShell
      title={education ? "Editar educación" : "Agregar educación"}
      onClose={onClose}
    >
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="id" value={form.id} />

        <FormField
          label="Título o grado"
          name="degree"
          value={form.degree}
          required
          error={state.errors?.degree?.[0]}
          onChange={(value) => updateField("degree", value)}
        />

        <FormField
          label="Institución"
          name="institution"
          value={form.institution}
          required
          error={state.errors?.institution?.[0]}
          onChange={(value) => updateField("institution", value)}
        />

        <FormField
          label="Ubicación"
          name="location"
          value={form.location}
          error={state.errors?.location?.[0]}
          onChange={(value) => updateField("location", value)}
        />

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
          label="Actualmente estudio aquí"
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

        {state.message && !state.success && (
          <p className="text-sm text-[#d45656]">{state.message}</p>
        )}

        <ModalActions onCancel={onClose} pending={pending} />
      </form>

      <StatusModal
        open={showSuccess}
        variant="success"
        title="Educación guardada"
        message={state.message ?? ""}
        onConfirm={onClose}
      />
    </ModalShell>
  );
}