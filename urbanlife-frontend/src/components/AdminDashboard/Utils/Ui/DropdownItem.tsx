import { Link } from "react-router";

interface DropdownItemProps {
  tag?: "a" | "button";
  to?: string;
  onClick?: () => void;
  onItemClick?: () => void;
  baseClassName?: string;
  className?: string;
  children: React.ReactNode;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  tag = "button",
  to,
  onClick,
  onItemClick,
  baseClassName = "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  className,
  children,
}) => {
  const handleClick = (event: React.MouseEvent) => {
    if (tag === "button") event.preventDefault();
    onClick?.();
    onItemClick?.();
  };

  return tag === "a" && to ? (
    <Link to={to} className={`${baseClassName} ${className}`.trim()} onClick={handleClick}>
      {children}
    </Link>
  ) : (
    <button onClick={handleClick} className={`${baseClassName} ${className}`.trim()}>
      {children}
    </button>
  );
};