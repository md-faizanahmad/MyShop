import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import UserMenu from "@/components/usermenu/UserMenu";

interface BottomNavigationItemProps {
  label: string;
  to: string;
  icon: LucideIcon;
  type: "link" | "account";
}

export default function BottomNavigationItem({
  label,
  to,
  icon: Icon,
  type,
}: BottomNavigationItemProps) {
  if (type === "account") {
    return (
      <div className="flex min-w-0 flex-1 items-center justify-center">
        <UserMenu />
      </div>
    );
  }

  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        [
          "flex min-w-0 flex-1 flex-col items-center justify-center gap-1",
          "py-2 text-[11px] font-medium transition-colors",
          isActive ? "text-red-600" : "text-neutral-500 active:text-red-900",
        ].join(" ")
      }
      aria-label={label}
    >
      {({ isActive }) => (
        <>
          <Icon size={21} strokeWidth={isActive ? 2 : 1.7} aria-hidden="true" />

          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}
