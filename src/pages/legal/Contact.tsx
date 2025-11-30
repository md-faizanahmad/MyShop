// src/pages/legal/Contact.tsx
import React, { useState } from "react";
import LegalLayout from "./LegalLayout";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL ?? "";

type FormState = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  orderId?: string;
};

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    orderId: "",
  });
  const [loading, setLoading] = useState(false);

  // update helper
  const update = (k: keyof FormState, v: string) =>
    setForm((s) => ({ ...s, [k]: v }));

  // quick contact details — change to your values
  const supportEmail = "support@myazstore.shop";
  // const backupEmail = "mdahmad.dev@gmail.com";
  const phoneNumber = "+917563092029"; // E.164 for tel: and wa.me
  const whatsappNumber = "917563092029"; // no '+' for wa.me

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // basic validation
    if (!form.name?.trim() || !form.email?.trim() || !form.message?.trim()) {
      toast.error("Name, email and message are required.");
      return;
    }

    setLoading(true);
    try {
      // try server endpoint if available
      await axios.post(
        `${API}/api/contact`,
        {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone?.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          orderId: form.orderId?.trim() || undefined,
        },
        { withCredentials: true, timeout: 8000 }
      );

      toast.success("Message sent — we'll get back to you within 24–48 hours.");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        orderId: "",
      });
    } catch {
      // fallback: open user's email client with prefilled mailto if backend fails / not present
      try {
        const subject = encodeURIComponent(
          form.subject || "Contact from website"
        );
        const body = encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nOrder ID: ${form.orderId}\n\n${form.message}`
        );
        window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
        toast.info("Opening your email client as a fallback...");
      } catch {
        toast.error(
          "Failed to send message. Please try contacting via email or WhatsApp."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  // small animated variants
  const card = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

  return (
    <LegalLayout title="Contact Us">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.header
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          className="mb-6"
        >
          <motion.h1 variants={card} className="text-2xl sm:text-3xl font-bold">
            Need help? We’re here for you.
          </motion.h1>
          <motion.p variants={card} className="mt-2 text-gray-600">
            Fast support via WhatsApp, email, or our contact form. Typical
            response time: <strong>24–48 hours</strong>.
          </motion.p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CONTACT METHODS */}
          <div className="md:col-span-1 space-y-4">
            <motion.div
              variants={card}
              className="bg-white shadow rounded-lg p-4"
            >
              <h3 className="font-semibold text-lg">Quick Contact</h3>
              <p className="text-sm text-gray-500 mt-1">
                Choose the fastest way to reach us.
              </p>

              <div className="mt-4 space-y-3">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    "Hi, I need help with my order."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 w-full bg-green-50 hover:bg-green-100 transition px-3 py-2 rounded-md"
                >
                  <svg
                    className="w-6 h-6 text-green-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M.057 24l1.687-6.163A11.928 11.928 0 0 1 .243 12C.243 5.373 5.616 0 12.243 0c3.2 0 6.189 1.249 8.438 3.497A11.854 11.854 0 0 1 24 11.757c0 6.627-5.373 12-11.757 12a11.9 11.9 0 0 1-5.983-1.675L.057 24zM12.244 21.6c4.32 0 8.01-2.98 8.01-8.014 0-4.33-3.697-7.99-8.01-7.99-4.33 0-7.99 3.66-7.99 7.99 0 4.33 3.66 8.015 7.99 8.015z" />
                    <path d="M17.58 14.53c-.29-.15-1.7-.85-1.96-.95-.26-.1-.45-.15-.64.15-.2.29-.78.95-.96 1.15-.17.2-.34.22-.63.075-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.61-2-.17-.29-.018-.45.13-.6.14-.13.29-.34.43-.51.14-.17.19-.28.29-.47.1-.2.05-.37-.025-.52-.075-.15-.64-1.54-.88-2.12-.23-.55-.47-.48-.64-.48-.17 0-.36-.01-.55-.01s-.51.075-.78.37c-.27.29-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.1 4.49 2.99 1.28 2.99.85 3.53.79.54-.06 1.74-.71 1.99-1.39.25-.68.25-1.27.17-1.39-.08-.12-.29-.19-.58-.34z" />
                  </svg>
                  <div>
                    <div className="text-sm font-medium text-green-700">
                      WhatsApp
                    </div>
                    <div className="text-xs text-gray-600">{phoneNumber}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${supportEmail}`}
                  className="flex items-center gap-3 w-full bg-blue-50 hover:bg-blue-100 transition px-3 py-2 rounded-md"
                >
                  <svg
                    className="w-6 h-6 text-blue-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M12 13.065L1.8 6.3A1.8 1.8 0 0 1 3.3 4.2h17.4c.9 0 1.5.9 1.2 1.8-.05.15-.13.3-.24.42L12 13.065z" />
                    <path d="M20.4 7.2v10.8c0 .99-.8 1.98-1.8 1.98H5.4c-1 0-1.8-.99-1.8-1.98V7.2" />
                  </svg>
                  <div>
                    <div className="text-sm font-medium text-sky-700">
                      Email
                    </div>
                    <div className="text-xs text-gray-600">{supportEmail}</div>
                  </div>
                </a>

                <a
                  href={`tel:${phoneNumber}`}
                  className="flex items-center gap-3 w-full bg-gray-50 hover:bg-gray-100 transition px-3 py-2 rounded-md"
                >
                  <svg
                    className="w-6 h-6 text-gray-700"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M6.6 10.79a15.05 15.05 0 006.6 6.6l2.2-2.2a1 1 0 011.03-.24c1.12.37 2.33.57 3.59.57a1 1 0 011 1V20a1 1 0 01-1 1C9.16 21 3 14.84 3 6a1 1 0 011-1h3.25a1 1 0 011 1c0 1.26.2 2.47.57 3.59.14.38.06.8-.22 1.2l-2.99 3.2z" />
                  </svg>
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      Phone
                    </div>
                    <div className="text-xs text-gray-600">{phoneNumber}</div>
                  </div>
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={card}
              className="bg-white shadow rounded-lg p-4"
            >
              <h4 className="font-semibold">Support Hours</h4>
              <p className="text-sm text-gray-600 mt-1">
                Mon–Sat: 9:00 AM — 7:00 PM IST
              </p>
              <p className="text-sm text-gray-500 mt-3">
                For urgent order issues, use WhatsApp for fastest response.
              </p>
            </motion.div>
          </div>

          {/* FORM */}
          <motion.div
            variants={card}
            className="md:col-span-2 bg-white p-6 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold">Send us a message</h3>
            <p className="text-sm text-gray-500 mt-1">
              Fill the form below — we’ll reply on email or WhatsApp.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-4 space-y-4"
              aria-live="polite"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block">
                  <div className="text-xs text-gray-600 mb-1">Full name</div>
                  <input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    required
                    className="w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-sky-500"
                    placeholder="Your name"
                  />
                </label>

                <label className="block">
                  <div className="text-xs text-gray-600 mb-1">Email</div>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                    className="w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-sky-500"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block">
                  <div className="text-xs text-gray-600 mb-1">
                    Phone (optional)
                  </div>
                  <input
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-sky-500"
                    placeholder="+91 9XXXXXXXXX"
                  />
                </label>

                <label className="block">
                  <div className="text-xs text-gray-600 mb-1">
                    Order ID (optional)
                  </div>
                  <input
                    value={form.orderId}
                    onChange={(e) => update("orderId", e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-sky-500"
                    placeholder="Order #ABC123"
                  />
                </label>
              </div>

              <label className="block">
                <div className="text-xs text-gray-600 mb-1">Subject</div>
                <input
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  className="w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-sky-500"
                  placeholder="What is this about?"
                />
              </label>

              <label className="block">
                <div className="text-xs text-gray-600 mb-1">Message</div>
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  required
                  rows={6}
                  className="w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-sky-500"
                  placeholder="Write your message here..."
                />
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : null}{" "}
                  Send Message
                </button>

                <a
                  href={`mailto:${supportEmail}`}
                  className="text-sm text-gray-600 hover:underline"
                  onClick={() => toast.info("Opening email client...")}
                >
                  Or email us directly
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </LegalLayout>
  );
}
