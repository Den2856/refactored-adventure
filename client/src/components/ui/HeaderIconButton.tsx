import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type HeaderIconButtonProps = {
  to?: string;
  onClick?: () => void;
  ariaLabel: string;
  children: ReactNode;
};

const baseClass = "inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-black/5 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20";

export default function HeaderIconButton({ to, onClick, ariaLabel, children, }: HeaderIconButtonProps) {
  if (to) {
    return (
      <Link to={to} aria-label={ariaLabel} className={baseClass}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={baseClass}
    >
      {children}
    </button>
  );
}