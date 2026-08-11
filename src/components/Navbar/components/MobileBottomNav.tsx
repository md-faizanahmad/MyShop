import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, Grid2X2, UserRound } from "lucide-react";

interface MobileBottomNavProps {
  onCategoriesClick: () => void;
}

interface NavigationItem {
  label: string;
  to: string;
  icon: typeof Home;
}

const navigationItems: NavigationItem[] = [
  {
    label: "Home",
    to: "/",
    icon: Home,
  },
  {
    label: "Products",
    to: "/products",
    icon: ShoppingBag,
  },
  {
    label: "Account",
    to: "/account",
    icon: UserRound,
  },
];

const baseItemClass =
  "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium tracking-tight transition-colors active:scale-95";

export default function MobileBottomNav({
  onCategoriesClick,
}: MobileBottomNavProps) {
  return (
    <nav
      aria-label="Mobile primary navigation"
      className="
        fixed inset-x-0 bottom-0 z-40
        border-t border-neutral-200
        bg-white/95
        pb-[env(safe-area-inset-bottom)]
        backdrop-blur-md
        md:hidden
      "
    >
      <div className="mx-auto flex h-16 w-full max-w-md items-stretch">
        <NavItem item={navigationItems[0]} />

        <NavItem item={navigationItems[1]} />

        <button
          type="button"
          onClick={onCategoriesClick}
          aria-label="Open categories"
          className={`${baseItemClass} text-neutral-500`}
        >
          <Grid2X2 size={21} strokeWidth={1.7} aria-hidden="true" />

          <span>Categories</span>
        </button>

        <NavItem item={navigationItems[2]} />
      </div>
    </nav>
  );
}

interface NavItemProps {
  item: NavigationItem;
}

function NavItem({ item }: NavItemProps) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      end={item.to === "/"}
      aria-label={item.label}
      className={({ isActive }) =>
        `${baseItemClass} ${isActive ? "text-red-600" : "text-neutral-500"}`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={21}
            strokeWidth={isActive ? 2.2 : 1.7}
            aria-hidden="true"
          />

          <span>{item.label}</span>
        </>
      )}
    </NavLink>
  );
}
