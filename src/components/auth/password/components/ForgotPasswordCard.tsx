import type { ReactNode } from "react";

interface ForgotPasswordCardProps {
  children: ReactNode;
}

export default function ForgotPasswordCard({
  children,
}: ForgotPasswordCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 font-sans antialiased">
      <div className="w-full max-w-md">
        <div className="relative min-h-[380px] overflow-hidden rounded-2xl border border-slate-200/60 bg-white px-4 py-8 shadow-xl shadow-slate-200/40 sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
