import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  size?: "sm" | "md";
  variant?: "primary" | "outline";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  isActive?: boolean; // <- Tambahan baru
}


const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  isActive = false, // <- default false
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-base",
  };

  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-full font-medium transition duration-150 ease-in-out";

  const variantClasses = {
    primary: "bg-cyan-600 text-white hover:bg-cyan-700 disabled:bg-blue-300",
    outline: isActive
      ? "bg-cyan-600 text-white border border-cyan-600 hover:bg-cyan-700"
      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-60" : "hover:shadow-sm"
      } ${className}`}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};


export default Button;
