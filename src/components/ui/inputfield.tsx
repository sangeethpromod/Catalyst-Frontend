import React from "react";

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  width?: string | number;
  className?: string;
  label?: string;
  id?: string;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  type = "text",
  placeholder = "",
  width = "100%",
  className = "",
  label,
  id,
  disabled = false,
}) => {
  const inputId = id || (label ? label.replace(/\s+/g, "-").toLowerCase() : undefined);
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={inputId} className="text-white text-sm font-normal">{label}</label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`bg-black border border-stone-800 text-white rounded font-light px-3 py-2 ${className}`}
        style={{ width }}
        disabled={disabled}
        autoComplete="off"
      />
    </div>
  );
};

export default InputField;
