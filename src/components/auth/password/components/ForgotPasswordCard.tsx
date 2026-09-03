import type { ReactNode } from "react";

interface ForgotPasswordCardProps {
  children: ReactNode;
}

export default function ForgotPasswordCard({
  children,
}: ForgotPasswordCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 font-sans antialiased sm:py-12">
      <div className="w-full max-w-md">
        <div className="relative min-h-[380px] overflow-hidden rounded-2xl border border-slate-200/60 bg-white px-4 py-7 shadow-xl shadow-slate-200/40 sm:px-10 sm:py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
