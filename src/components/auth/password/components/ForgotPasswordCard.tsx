import type { ReactNode } from "react";

interface ForgotPasswordCardProps {
  children: ReactNode;
}

export default function ForgotPasswordCard({
  children,
}: ForgotPasswordCardProps) {
  return (
    <main className="min-h-dvh px-4 py-8 sm:px-6 sm:py-18 lg:px-8">
      <section className="mx-auto w-full max-w-md">{children}</section>
    </main>
  );
}
