import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  type LucideIcon,
} from "lucide-react";

export interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
  color: string; // Tailwind hover color class
}

export const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://instagram.com/yourstore",
    icon: Instagram,
    color: "hover:text-pink-500",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/yourstore",
    icon: Twitter,
    color: "hover:text-sky-400",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/yourstore",
    icon: Facebook,
    color: "hover:text-blue-600",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/yourstore",
    icon: Youtube,
    color: "hover:text-red-600",
  },
];
