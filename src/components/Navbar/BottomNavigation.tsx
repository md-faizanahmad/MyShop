import BottomNavigationItem from "./BottomNavigation/BottomNavigationItem";
import { bottomNavigationItems } from "./BottomNavigation/bottomNavigation.config";

export default function BottomNavigation() {
  return (
    <nav
      aria-label="Primary navigation"
      className="
        fixed inset-x-0 bottom-0 z-40
        border-t border-neutral-200/80
        bg-white
        pb-[env(safe-area-inset-bottom)]
        md:hidden
      "
    >
      <div className="flex h-16 items-stretch">
        {bottomNavigationItems.map((item) => (
          <BottomNavigationItem key={item.to} {...item} />
        ))}
      </div>
    </nav>
  );
}
