import type { ReactNode } from "react";

export default function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 mt-10">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="prose prose-neutral max-w-none">{children}</div>
    </div>
  );
}
