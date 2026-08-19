import { Compass, Heart, House, ShoppingBag, UserRound } from "lucide-react";

export const bottomNavigationItems = [
  {
    label: "Home",
    to: "/",
    icon: House,
    type: "link",
  },
  {
    label: "Products",
    to: "/products",
    icon: ShoppingBag,
    type: "link",
  },
  {
    label: "Explore",
    to: "/explore",
    icon: Compass,
    type: "link",
  },

  {
    label: "Wishlist",
    to: "/wishlist",
    icon: Heart,
    type: "link",
  },
  {
    label: "Account",
    to: "/login",
    icon: UserRound,
    type: "account",
  },
] as const;
