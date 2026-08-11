import { Compass, Heart, House, ShoppingBag, UserRound } from "lucide-react";

export const bottomNavigationItems = [
  {
    label: "Home",
    to: "/",
    icon: House,
  },
  {
    label: "Explore",
    to: "/explore",
    icon: Compass,
  },
  {
    label: "Products",
    to: "/products",
    icon: ShoppingBag,
  },
  {
    label: "Wishlist",
    to: "/wishlist",
    icon: Heart,
  },
  {
    label: "Account",
    to: "/account",
    icon: UserRound,
  },
] as const;
