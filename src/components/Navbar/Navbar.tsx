import MobileNavbar from "./components/MobileNavbar";
import DesktopNavbar from "./components/DesktopNavbar";
import type { NavbarProps } from "../../types/nav";
import { useCategories } from "../../hooks/useCategories";

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
