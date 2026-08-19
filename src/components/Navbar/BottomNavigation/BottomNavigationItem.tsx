import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import UserMenu from "@/components/usermenu/UserMenu";

interface BottomNavigationItemProps {
  label: string;
  to: string;
  icon: LucideIcon;
  type: "link" | "account";
  badge?: number;
}

export default function BottomNavigationItem({
  label,
  to,
  icon: Icon,
  type,
  badge,
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
      className="relative flex min-w-0 flex-1 flex-col items-center justify-center"
      aria-label={label}
    >
      {({ isActive }) => (
        <>
          {/* Active circular notch */}
          {isActive && (
            <span
              className="
                pointer-events-none
                absolute left-1/2 top-0
                h-14 w-14
                -translate-x-1/2 -translate-y-1/2
                rounded-full

              "
            />
          )}

          {/* Icon */}
          <div
            className={`
              relative z-10
              flex items-center justify-center
              transition-all duration-300 ease-out
              ${
                isActive
                  ? "h-11 w-11 -translate-y-4 rounded-full bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "h-9 w-9 translate-y-0 text-neutral-500"
              }
            `}
          >
            <Icon
              size={isActive ? 22 : 21}
              strokeWidth={isActive ? 2.2 : 1.7}
              aria-hidden="true"
            />

            {/* Wishlist badge */}
            {badge !== undefined && badge > 0 && (
              <span
                className="
                  absolute -right-1 -top-1
                  flex h-4 min-w-4 items-center justify-center
                  rounded-full bg-red-500 px-1
                  text-[10px] font-bold leading-none text-white
                  ring-2 ring-white
                "
              >
                {badge > 99 ? "99+" : badge}
              </span>
            )}
          </div>

          {/* Label */}
          <span
            className={`
              relative z-10
              text-[11px] font-medium
              transition-colors duration-300
              ${isActive ? "-mt-2 text-red-600" : "mt-0 text-neutral-500"}
            `}
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
}
