"use client";

import { useActionState, useEffect, useState } from "react";
import FormField from "./form-field";
import ModalActions from "./modal-actions";
import ModalShell from "./modal-shell";
import StatusModal from "./status-modal";
import { skillAction, GeneralState } from "@/actions/skill/action-skill";

type SkillsModalProps = {
  skills: { id: number; name: string }[];
  onClose: () => void;
};

const initialState: GeneralState = {
  success: false,
  message: "",
};

export default function SkillsModal({ skills, onClose }: SkillsModalProps) {
  const [state, formAction, pending] = useActionState(
    skillAction,
    initialState,
  );

  const [skill, setSkill] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.success && state.message) {
      setShowSuccess(true);
    }
  }, [state.success, state.message]);

  const handleSkillChange = (value: string) => {
    setSkill(value);
  };

  const handleSuccessConfirm = () => {
    setSkill("");
    setShowSuccess(false);
  };

  return (
    <ModalShell title="Agregar habilidad" onClose={onClose}>
      <form action={formAction} className="space-y-5">
        <FormField
          label="Habilidad"
          name="name"
          value={skill}
          required
          placeholder="Ej. React"
          error={state.errors?.name?.[0]}
          onChange={handleSkillChange}
        />

        {skills.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium text-[#888888]">
              Habilidades actuales
            </p>

            <div className="flex flex-wrap gap-2">
              {skills.map((item) => (
                <span
                  key={item.id}
                  className="rounded-full bg-[#f7f7f7] px-3 py-1.5 text-xs text-[#5a5a5c]"
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {state.message && !state.success && (
          <p className="text-sm text-[#d45656]">{state.message}</p>
        )}

        <ModalActions onCancel={onClose} pending={pending} submitLabel="Agregar" />
      </form>

      <StatusModal
        open={showSuccess}
        variant="success"
        title="Habilidad guardada"
        message={state.message ?? ""}
        onConfirm={handleSuccessConfirm}
      />
    </ModalShell>
  );
}