import type { LucideIcon } from "lucide-react";

export interface Announcement {
  id: number;
  icon: LucideIcon;
  message: string;
  cta: string;
  href: string;
}
