"use client";

type SelectOption = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  name?: string;
  error?: string;
};

export default function SelectField({
  label,
  value,
  options,
  onChange,
  name,
  error,
}: SelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[#3a3a3c]">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        name={name}
        className="w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-2.5 text-sm text-[#0a0a0a] outline-none focus:border-[#00b48a]"
      >
        <option value="">Seleccionar</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1 text-sm text-[#d45656]">{error}</p>
      )}
    </label>
  );
}