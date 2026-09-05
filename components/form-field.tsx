"use client";

type FormFieldProps = {
  label: string;
  value: string;
  name: string;
  placeholder?: string;
  error?: string;
  type?: string;
  required?: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function FormField({
  label,
  value,
  placeholder,
  type = "text",
  required = false,
  name,
  error,
  onChange,
}: FormFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[#3a3a3c]">
        {label}
        {required && <span className="ml-1 text-[#d45656]">*</span>}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-2.5 text-sm text-[#0a0a0a] outline-none transition placeholder:text-[#a8a8aa] focus:border-[#00b48a]"
      />
      {error && <p className="text-xs text-[#d45656]">{error}</p>}
    </label>
  );
}
