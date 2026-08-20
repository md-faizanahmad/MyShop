import { Heart, House, Search, ShoppingBag, User } from "lucide-react";

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
    icon: Search,
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
    icon: User,
    type: "account",
  },
] as const;
