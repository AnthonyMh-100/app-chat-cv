"use client";
type TextAreaFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (value: string) => void;
  name: string;
  error?: string;
};

export default function TextAreaField({
  label,
  value,
  placeholder,
  required = false,
  onChange,
  name,
  error,
}: TextAreaFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[#3a3a3c]">
        {label}
        {required && <span className="ml-1 text-[#d45656]">*</span>}
      </span>

      <textarea
        value={value}
        placeholder={placeholder}
        required={required}
        rows={4}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-none rounded-md border border-[#e5e5e5] bg-white px-3 py-2.5 text-sm text-[#0a0a0a] outline-none transition placeholder:text-[#a8a8aa] focus:border-[#00b48a]"
      />
      {error && <p className="text-xs text-[#d45656]">{error}</p>}
    </label>
  );
}
