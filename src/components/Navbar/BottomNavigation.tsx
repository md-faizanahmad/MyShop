import { useWishlistStore } from "@/store/useWishlistStore";
import BottomNavigationItem from "./BottomNavigation/BottomNavigationItem";
import { bottomNavigationItems } from "./BottomNavigation/bottomNavigation.config";

export default function BottomNavigation() {
  const wishlistCount = useWishlistStore((state) => state.items.length);

  return (
    <nav
      aria-label="Primary navigation"
      className="
        fixed inset-x-0 bottom-0 z-40
        border-t border-neutral-200/80
bg-white/75 backdrop-blur-xl backdrop-saturate-150
        pb-[env(safe-area-inset-bottom)]
        md:hidden
      "
    >
      <div className="flex h-16 items-stretch">
        {bottomNavigationItems.map((item) => (
          <BottomNavigationItem
            key={item.to}
            {...item}
            badge={item.to === "/wishlist" ? wishlistCount : undefined}
          />
        ))}
      </div>
    </nav>
  );
}
