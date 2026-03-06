import { useState, type InputHTMLAttributes } from "react";

import { Eye, EyeOff } from "lucide-react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  containerClassName?: string;
};

export function TextField({ label, id, className = "", ...props }: Props) {

  const inputId = id ?? props.name;

  return (
    <div className="relative mt-3">
      <label htmlFor={inputId} className="block text-secondary mb-2 text-b-text-1">
        {label}
      </label>

      <input
        id={inputId}
        className={`w-full h-12 rounded-xl bg-input-bg border border-[#BCC3D080] px-4 text-placeholder outline-none focus:ring-2 focus:ring-blue-h focus:border-blue-p/40 ${className}`}
        {...props}
      />
    </div>
  );
}

type PasswordProps = Omit<Props, "type">;

export function PasswordField({ label, id, className = "", ...props }: PasswordProps) {
  
  const [show, setShow] = useState(false);
  const inputId = id ?? props.name;

  return (
    <div className="relative mt-3">
      <label htmlFor={inputId} className="block text-secondary mb-2 text-b-text-1">
        {label}
      </label>

      <div className="relative">
        <input
          id={inputId}
          type={show ? "text" : "password"}
          className={`w-full h-12 rounded-xl bg-input-bg border border-[#BCC3D080] pl-4 pr-12 text-placeholder outline-none focus:ring-2 focus:ring-blue-h focus:border-blue-p/40 ${className}`}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Скрыть пароль" : "Показать пароль"}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 transition-colors duration-300 ease-out text-secondary hover:text-primary hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-h/30"
        >
          {show ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      </div>
    </div>
  );
}