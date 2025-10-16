import React from "react";



interface DropdownProps {
  options: Array<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
  width?: string | number;
  className?: string;
  label?: string;
  id?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  width = "100%",
  className = "",
  label,
  id,
}) => {
  const selectId = id || (label ? label.replace(/\s+/g, "-").toLowerCase() : undefined);
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={selectId} className="text-white text-sm font-normal">{label}</label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`bg-black border border-stone-800 text-white rounded font-light px-3 py-2 ${className}`}
        style={{ width }}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-black font-normal text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
