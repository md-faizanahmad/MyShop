// import { NavLink } from "react-router-dom";
// import type { LucideIcon } from "lucide-react";
// import UserMenu from "@/components/usermenu/UserMenu";

// interface BottomNavigationItemProps {
//   label: string;
//   to: string;
//   icon: LucideIcon;
//   type: "link" | "account";
//   badge?: number;
// }

// export default function BottomNavigationItem({
//   label,
//   to,
//   icon: Icon,
//   type,
// }: BottomNavigationItemProps) {
//   if (type === "account") {
//     return (
//       <div className="flex min-w-0 flex-1 items-center justify-center">
//         <UserMenu />
//       </div>
//     );
//   }

//   return (
//     <NavLink
//       to={to}
//       end={to === "/"}
//       className={({ isActive }) =>
//         [
//           "flex min-w-0 flex-1 flex-col items-center justify-center gap-1",
//           "py-2 text-[11px] font-medium transition-colors",
//           isActive ? "text-red-600" : "text-neutral-500 active:text-red-900",
//         ].join(" ")
//       }
//       aria-label={label}
//     >
//       {({ isActive }) => (
//         <>
//           <Icon size={21} strokeWidth={isActive ? 2 : 1.7} aria-hidden="true" />

//           <span>{label}</span>
//         </>
//       )}
//     </NavLink>
//   );
// }
//////////// above normal down update ui
import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import UserMenu from "@/components/usermenu/UserMenu";

interface BottomNavigationItemProps {
  label: string;
  to: string;
  icon: LucideIcon;
  type: "link" | "account";
  badge?: number;
  badgeLoading?: boolean;
}

export default function BottomNavigationItem({
  label,
  to,
  icon: Icon,
  type,
  badge,
  badgeLoading,
}: BottomNavigationItemProps) {
  const isExplore = to === "/explore";

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
          "relative flex min-w-0 flex-1 flex-col items-center justify-center",
          "py-2 text-[11px] font-medium transition-colors duration-200",
          isActive && !isExplore
            ? "text-red-600"
            : "text-neutral-500 active:text-red-900",
        ].join(" ")
      }
      aria-label={label}
    >
      {({ isActive }) => (
        <>
          {/* Explore notch */}
          {isExplore && (
            <span
              className="
      pointer-events-none
      absolute left-1/2 top-0
      h-16 w-16
      -translate-x-1/2 -translate-y-1/2
      rounded-full

    "
            />
          )}

          {/* Icon */}
          <div
            className={`
    relative z-10 flex shrink-0 items-center justify-center
    rounded-full
    transition-all duration-300 ease-out
    ${
      isExplore
        ? "h-11 w-11 -translate-y-5 rounded-full bg-red-700 text-white shadow-lg shadow-red-600/30 ring-1 ring-white"
        : "h-9 w-9 text-neutral-500"
    }
  `}
          >
            <Icon
              size={isExplore ? 23 : 21}
              strokeWidth={isActive ? 2.2 : 1.7}
              aria-hidden="true"
            />

            {/* Wishlist badge */}
            {badgeLoading ? (
              <span
                aria-hidden="true"
                className="
      absolute -right-1 -top-1
      h-4 min-w-4
      animate-pulse
      rounded-full
      bg-neutral-200
      ring-2 ring-white
    "
              />
            ) : (
              badge !== undefined &&
              badge > 0 && (
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
              )
            )}
          </div>

          {/* Label */}
          <span
            className={`
              relative z-10 text-[11px] font-medium
              transition-colors duration-200
              ${
                isExplore
                  ? "-mt-2 text-red-600"
                  : isActive
                    ? "text-red-600"
                    : "text-neutral-500"
              }
            `}
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
}
