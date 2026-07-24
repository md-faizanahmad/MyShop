import React from "react";
import { Loader2 } from "lucide-react";

export type SupportTopic = "orders" | "returns" | "payment" | "general";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  topic: SupportTopic;
  orderId: string;
  message: string;
}

interface ContactFormProps {
  form: ContactFormData;
  loading: boolean;
  onChange: (key: keyof ContactFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const SUPPORT_TOPICS = [
  {
    id: "orders",
    label: "Order Status",
  },
  {
    id: "returns",
    label: "Returns & Refund",
  },
  {
    id: "payment",
    label: "Payment Issue",
  },
  {
    id: "general",
    label: "General Inquiry",
  },
] as const;
export const ContactForm: React.FC<ContactFormProps> = ({
  form,
  loading,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Category Pills */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
          How can we help?
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { id: "orders", label: "Order Status" },
            { id: "returns", label: "Returns & Refund" },
            { id: "payment", label: "Payment Issue" },
            { id: "general", label: "General Inquiry" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange("topic", item.id as SupportTopic)}
              className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                form.topic === item.id
                  ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="c-name"
            className="mb-1 block text-xs font-medium text-slate-700"
          >
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="c-name"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            required
            className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            placeholder="Alex Morgan"
          />
        </div>

        <div>
          <label
            htmlFor="c-email"
            className="mb-1 block text-xs font-medium text-slate-700"
          >
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            id="c-email"
            type="email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            required
            className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            placeholder="alex@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="c-phone"
            className="mb-1 block text-xs font-medium text-slate-700"
          >
            Phone Number <span className="text-slate-400">(Optional)</span>
          </label>
          <input
            id="c-phone"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            placeholder="+91 98765 43210"
          />
        </div>

        <div>
          <label
            htmlFor="c-order"
            className="mb-1 block text-xs font-medium text-slate-700"
          >
            Order Reference ID{" "}
            <span className="text-slate-400">(Optional)</span>
          </label>
          <input
            id="c-order"
            value={form.orderId}
            onChange={(e) => onChange("orderId", e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            placeholder="e.g. #ORD-9842"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="c-msg"
          className="mb-1 block text-xs font-medium text-slate-700"
        >
          Describe your issue <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="c-msg"
          value={form.message}
          onChange={(e) => onChange("message", e.target.value)}
          required
          rows={5}
          className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          placeholder="Please include relevant detail like item name or delivery address if applicable..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 disabled:opacity-60 sm:w-auto"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Submit Support Ticket
      </button>
    </form>
  );
};
