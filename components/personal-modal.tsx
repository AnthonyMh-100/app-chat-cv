"use client";

import { useActionState, useEffect, useState } from "react";
import { Personal } from "../constants";
import FormField from "./form-field";
import ModalActions from "./modal-actions";
import ModalShell from "./modal-shell";
import StatusModal from "./status-modal";
import TextAreaField from "./textarea-field";
import { GeneralState, profileAction } from "@/actions/profile/action-profile";

type PersonalModalProps = {
  personal?: Personal;
  onClose: () => void;
};

const initialState: GeneralState = {
  success: false,
  message: "",
};

const emptyPersonalForm: Personal = {
  id: "",
  name: "",
  surname: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  website: "",
  profile: "",
};

export default function PersonalModal({
  personal,
  onClose,
}: PersonalModalProps) {
  const [state, formAction, pending] = useActionState(
    profileAction,
    initialState,
  );

  const [form, setForm] = useState<Personal>(personal ?? emptyPersonalForm);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.success && state.message) {
      setShowSuccess(true);
    }
  }, [state.success, state.message]);

  const updateField = (field: keyof Personal, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <ModalShell title="Información personal" onClose={onClose}>
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="id" value={form.id} />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Nombre"
            name="name"
            value={form.name}
            required
            error={state.errors?.name?.[0]}
            onChange={(value) => updateField("name", value)}
          />

          <FormField
            label="Apellido"
            name="surname"
            value={form.surname}
            required
            error={state.errors?.surname?.[0]}
            onChange={(value) => updateField("surname", value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Correo"
            name="email"
            type="email"
            value={form.email}
            required
            error={state.errors?.email?.[0]}
            onChange={(value) => updateField("email", value)}
          />

          <FormField
            label="Teléfono"
            name="phone"
            value={form.phone}
            error={state.errors?.phone?.[0]}
            onChange={(value) => updateField("phone", value)}
          />
        </div>

        <FormField
          label="Ubicación"
          name="location"
          value={form.location}
          error={state.errors?.location?.[0]}
          onChange={(value) => updateField("location", value)}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="LinkedIn"
            name="linkedin"
            value={form.linkedin}
            error={state.errors?.linkedin?.[0]}
            onChange={(value) => updateField("linkedin", value)}
          />

          <FormField
            label="GitHub"
            name="github"
            value={form.github}
            error={state.errors?.github?.[0]}
            onChange={(value) => updateField("github", value)}
          />
        </div>

        <FormField
          label="Sitio web"
          name="website"
          value={form.website}
          error={state.errors?.website?.[0]}
          onChange={(value) => updateField("website", value)}
        />

        <TextAreaField
          label="Perfil profesional"
          name="profile"
          value={form.profile}
          error={state.errors?.profile?.[0]}
          onChange={(value) => updateField("profile", value)}
        />

        {state.message && !state.success && (
          <p className="text-sm text-[#d45656]">{state.message}</p>
        )}

        <ModalActions onCancel={onClose} pending={pending} />
      </form>

      <StatusModal
        open={showSuccess}
        variant="success"
        title="Información guardada"
        message={state.message ?? ""}
        onConfirm={onClose}
      />
    </ModalShell>
  );
}