import type { NavbarProps } from "../../types/nav";
import { useCategories } from "../../hooks/useCategories";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

export default function Navbar({ mobile = false, onClose }: NavbarProps) {
  const { data: categories = [], isLoading } = useCategories();

  return (
    <nav className="w-full">
      {mobile ? (
        <MobileNavbar categories={categories} onClose={onClose} />
      ) : (
        <DesktopNavbar categories={categories} isLoading={isLoading} />
      )}
    </nav>
  );
}
