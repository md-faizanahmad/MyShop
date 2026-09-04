import type { ReactNode } from "react";

interface ForgotPasswordCardProps {
  children: ReactNode;
}

export default function ForgotPasswordCard({
  children,
}: ForgotPasswordCardProps) {
  return (
    <main className="min-h-screen px-4 pt-5 pb-8 font-sans antialiased sm:flex sm:items-center sm:justify-center sm:py-12">
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white px-4 py-6 shadow-xl shadow-slate-200/40 sm:px-10 sm:py-8">
          {children}
        </div>
      </div>
    </main>
  );
}
