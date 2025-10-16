import React from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "disabled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  width?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  width = "w-full",
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 h-10 rounded font-medium text-sm transition-colors duration-200";

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-[#be123c] text-black hover:bg-[#1e1e1e]",
    secondary: "bg-[#e4e4e4] text-[#343434] hover:bg-[#cfcfcf]",
    tertiary: "bg-white border border-[#e4e4e4] text-black hover:bg-gray-200", 
    disabled: "bg-[#a5a5a5] text-gray-400 cursor-not-allowed opacity-60",
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        width,
        className,
        props.disabled && variantStyles['disabled']
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;