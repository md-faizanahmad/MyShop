export type SupportTopic = "orders" | "returns" | "payment" | "general";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  topic: SupportTopic;
  orderId: string;
  message: string;
}
