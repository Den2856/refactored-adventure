import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger";
type Size = "full" | "sm";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const base = "rounded-[10px] text-button transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed";

const sizes: Record<Size, string> = {
  full: "w-full h-12",
  sm: "h-9 px-4",
};

const variants: Record<Variant, string> = {
  primary: "text-white bg-blue-d hover:bg-blue-h active:bg-blue-p",
  secondary: "text-primary bg-gray-d hover:bg-gray-h active:bg-gray-p",
  danger: "text-white bg-danger hover:bg-danger/90 active:bg-danger/80",
};

export function ActionButton({ variant = "primary", size = "full", className = "", ...props }: Props) {
  return (
    <button
      {...props}
      className={[base, sizes[size], variants[variant], className].filter(Boolean).join(" ")}
    />
  );
}