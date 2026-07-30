import { BadgePercent, CreditCard, Gift, Truck, Zap } from "lucide-react";

import type { Announcement } from "./announcement.types";

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    icon: Truck,
    message: "Free shipping on orders above ₹999",
    cta: "Shop Now",
    href: "/products",
  },
  {
    id: 2,
    icon: BadgePercent,
    message: "Up to 70% OFF on top electronics",
    cta: "View Deals",
    href: "/deals",
  },
  {
    id: 3,
    icon: Gift,
    message: "Independence Day Sale is now live",
    cta: "Explore",
    href: "/sale",
  },
  {
    id: 4,
    icon: CreditCard,
    message: "Instant 10% discount on selected bank cards",
    cta: "View Offer",
    href: "/offers",
  },
  {
    id: 5,
    icon: Zap,
    message: "Lightning deals updated every day",
    cta: "Discover",
    href: "/flash-sale",
  },
];
