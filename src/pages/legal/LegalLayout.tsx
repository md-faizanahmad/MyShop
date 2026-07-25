import type { ReactNode } from "react";

export default function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className=" mx-auto px-4 py-5 ">
      <h5 className="text-2xl font-bold text-gray-500 mb-6">{title}</h5>
      <div className="prose prose-neutral max-w-none">{children}</div>
    </div>
  );
}
