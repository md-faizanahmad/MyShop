import type { ReactNode } from "react";

interface CategoryBadgeProps {
  icon: ReactNode;
  name: string;
  className: string;
}

const badgeClass =
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-none";

export default function CategoryBadge({
  icon,
  name,
  className,
}: CategoryBadgeProps) {
  return (
    <span className={`${badgeClass} ${className}`}>
      {icon}
      <span>{name}</span>
    </span>
  );
}
