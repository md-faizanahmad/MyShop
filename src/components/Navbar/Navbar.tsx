import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Category, NavbarProps } from "./components/Navbar.types";
import MobileNavbar from "./components/MobileNavbar";
import DesktopNavbar from "./components/DesktopNavbar";

const API_URL = import.meta.env.VITE_API_URL;

export default function Navbar({ mobile = false, onClose }: NavbarProps) {
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["public-categories-with-subs"],
    queryFn: async () => {
      const res = await axios.get<{ categories: Category[] }>(
        `${API_URL}/v1/categories?withSubs=true`,
      );

      return res.data.categories ?? [];
    },
  });

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
