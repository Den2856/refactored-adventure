import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export default function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <div className={`min-h-screen bg-bg-blue px-4 py-6 sm:py-10 ${className}`}>
      <div className="mx-auto w-full max-w-360 rounded-[10px] bg-white shadow-header">
        <div className="px-4 py-5 sm:px-8 sm:py-8 lg:px-17 lg:py-14">{children}</div>
      </div>
    </div>
  ); 
}