"use client";

type CheckboxFieldProps = {
  label: string;
  checked: boolean;
  name?: string;
  onChange: (checked: boolean) => void;
};

export default function CheckboxField({
  label,
  checked,
  onChange,
  name,
}: CheckboxFieldProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      <input
        type="checkbox"
        checked={checked}
        name={name}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-[#00b48a]"
      />

      <span className="text-sm text-[#3a3a3c]">{label}</span>
    </label>
  );
}
