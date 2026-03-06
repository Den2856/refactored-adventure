import type { ReactNode } from "react";

type AuthLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-bg-blue flex items-center justify-center px-4 max-[420px]:px-0">
      <div className="w-full relative max-w-140 rounded-[36px] bg-white shadow-header max-[420px]:rounded-b-none max-[420px]:bottom-0">
        <div className="px-5 py-6 sm:px-17 sm:py-14">
          <h1 className="text-b-title-1 max-sm:text-b-title-2 text-center not-italic">
            {title}
          </h1>

          <div className="mt-8 max-w-100 mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}