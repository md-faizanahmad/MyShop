// contact.config.ts

import type { SupportTopic } from "../types/contact.types";

/* -------------------------------------------------------------------------- */
/*                               Contact Details                              */
/* -------------------------------------------------------------------------- */

export const CONTACT = {
  email: import.meta.env.VITE_SUPPORT_EMAIL ?? "support@myazstore.shop",

  phone: import.meta.env.VITE_SUPPORT_PHONE ?? "+91 75630 92029",

  whatsapp: import.meta.env.VITE_SUPPORT_WHATSAPP ?? "917563092029",

  website: "https://myazstore.shop",
} as const;

/* -------------------------------------------------------------------------- */
/*                              Business Hours                                */
/* -------------------------------------------------------------------------- */

export const BUSINESS_HOURS = {
  weekdays: {
    days: "Monday – Saturday",
    time: "9:00 AM – 7:00 PM IST",
  },

  weekend: {
    days: "Sunday",
    time: "Closed",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*                             Response Times                                 */
/* -------------------------------------------------------------------------- */

export const RESPONSE_TIME = {
  whatsapp: "Usually within 15 minutes",

  email: "Within 24 hours",

  phone: "Business hours only",
} as const;

/* -------------------------------------------------------------------------- */
/*                              Support Topics                                */
/* -------------------------------------------------------------------------- */

export interface SupportTopicConfig {
  id: SupportTopic;
  label: string;
  description: string;
}

export const SUPPORT_TOPICS: readonly SupportTopicConfig[] = [
  {
    id: "orders",
    label: "Order Status",
    description: "Track, update or manage an existing order.",
  },
  {
    id: "returns",
    label: "Returns & Refunds",
    description: "Replacement, return or refund requests.",
  },
  {
    id: "payment",
    label: "Payment Issues",
    description: "Payment failures or billing related questions.",
  },
  {
    id: "general",
    label: "General Inquiry",
    description: "Questions about products or our services.",
  },
];

/* -------------------------------------------------------------------------- */
/*                              Contact Form                                  */
/* -------------------------------------------------------------------------- */

export const CONTACT_FORM = {
  title: "Contact Customer Support",

  description:
    "Tell us how we can help and we'll get back to you as soon as possible.",

  placeholders: {
    name: "Enter your full name",

    email: "name@example.com",

    phone: "+91 XXXXX XXXXX",

    orderId: "Example: ORD-123456",

    message:
      "Describe your issue in detail. Include your order ID if applicable.",
  },

  button: {
    idle: "Send Message",

    loading: "Sending...",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*                             Contact Channels                               */
/* -------------------------------------------------------------------------- */

export const CONTACT_CHANNELS = [
  {
    id: "whatsapp",
    title: "WhatsApp",
    description: "Fastest way to get support.",
  },
  {
    id: "email",
    title: "Email",
    description: "Best for detailed questions.",
  },
  {
    id: "phone",
    title: "Phone",
    description: "Available during business hours.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                             Status Banner                                  */
/* -------------------------------------------------------------------------- */

export const SUPPORT_STATUS = {
  title: "Support Team Online",

  description: "Our customer support team is available during business hours.",

  badge: "Online",
} as const;
