"use client";

import { useActionState, useEffect, useState } from "react";
import { Language } from "../constants";
import FormField from "./form-field";
import ModalActions from "./modal-actions";
import ModalShell from "./modal-shell";
import SelectField from "./select-field";
import StatusModal from "./status-modal";
import { languageAction, GeneralState } from "@/actions/language/action-language";

type LanguageModalProps = {
  language?: Language;
  onClose: () => void;
};

const initialState: GeneralState = {
  success: false,
  message: "",
};

const emptyLanguage: Language = {
  id: "",
  language: "",
  level: "",
};

export default function LanguageModal({
  language,
  onClose,
}: LanguageModalProps) {
  const [state, formAction, pending] = useActionState(
    languageAction,
    initialState,
  );

  const [form, setForm] = useState<Language>(language ?? emptyLanguage);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.success && state.message) {
      setShowSuccess(true);
    }
  }, [state.success, state.message]);

  const updateField = <K extends keyof Language>(
    field: K,
    value: Language[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <ModalShell
      title={language ? "Editar idioma" : "Agregar idioma"}
      onClose={onClose}
    >
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="id" value={form.id} />

        <FormField
          label="Idioma"
          name="language"
          value={form.language}
          required
          error={state.errors?.language?.[0]}
          onChange={(value) => updateField("language", value)}
        />

        <SelectField
          label="Nivel"
          name="level"
          value={form.level}
          options={[
            { label: "Básico", value: "Básico" },
            { label: "Intermedio", value: "Intermedio" },
            { label: "Avanzado", value: "Avanzado" },
            { label: "Nativo", value: "Nativo" },
          ]}
          error={state.errors?.level?.[0]}
          onChange={(value) => updateField("level", value)}
        />

        {state.message && !state.success && (
          <p className="text-sm text-[#d45656]">{state.message}</p>
        )}

        <ModalActions onCancel={onClose} pending={pending} />
      </form>

      <StatusModal
        open={showSuccess}
        variant="success"
        title="Idioma guardado"
        message={state.message ?? ""}
        onConfirm={onClose}
      />
    </ModalShell>
  );
}