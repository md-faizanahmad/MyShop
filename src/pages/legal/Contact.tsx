import React, { useState } from "react";
import LegalLayout from "./LegalLayout";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2, Phone, Mail, MessageSquare } from "lucide-react";

const API = import.meta.env.VITE_API_URL ?? "";

// Pull contact details from env vars with fallbacks
const SUPPORT_EMAIL =
  import.meta.env.VITE_SUPPORT_EMAIL ?? "support@myazstore.shop";
const PHONE_NUMBER = import.meta.env.VITE_SUPPORT_PHONE ?? "+917563092029";
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? "917563092029";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  orderId: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  orderId: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [loading, setLoading] = useState(false);

  const update = (k: keyof FormState, v: string) =>
    setForm((s) => ({ ...s, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Name, email, and message are required.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${API}/v1/contact`,
        {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          subject: form.subject.trim() || undefined,
          message: form.message.trim(),
          orderId: form.orderId.trim() || undefined,
        },
        { withCredentials: true, timeout: 8000 },
      );

      toast.success("Message sent — we'll get back to you within 24–48 hours.");
      setForm(initialFormState);
    } catch (err) {
      // Fallback to mailto link on API error
      try {
        const subject = encodeURIComponent(
          form.subject.trim() || "Contact from website",
        );
        const body = encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nOrder ID: ${form.orderId}\n\n${form.message}`,
        );

        window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body.slice(0, 1500)}`;
        toast.info("Opening your email client as a fallback...");
      } catch {
        toast.error(
          "Failed to send message. Please reach out via WhatsApp directly.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  const cardVariant = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <LegalLayout title="Contact Us">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.header
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          className="mb-6"
        >
          <motion.h1
            variants={cardVariant}
            className="text-2xl sm:text-3xl font-bold"
          >
            Need help? We’re here for you.
          </motion.h1>
          <motion.p variants={cardVariant} className="mt-2 text-gray-600">
            Fast support via WhatsApp, email, or our contact form. Typical
            response time: <strong>24–48 hours</strong>.
          </motion.p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar Info */}
          <div className="md:col-span-1 space-y-4">
            <motion.div
              variants={cardVariant}
              className="bg-white shadow rounded-lg p-4"
            >
              <h3 className="font-semibold text-lg">Quick Contact</h3>
              <p className="text-sm text-gray-500 mt-1">
                Choose the fastest way to reach us.
              </p>

              <div className="mt-4 space-y-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I need help with my order.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 w-full bg-green-50 hover:bg-green-100 transition px-3 py-2 rounded-md"
                >
                  <MessageSquare className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-sm font-medium text-green-700">
                      WhatsApp
                    </div>
                    <div className="text-xs text-gray-600">{PHONE_NUMBER}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="flex items-center gap-3 w-full bg-blue-50 hover:bg-blue-100 transition px-3 py-2 rounded-md"
                >
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm font-medium text-sky-700">
                      Email
                    </div>
                    <div className="text-xs text-gray-600">{SUPPORT_EMAIL}</div>
                  </div>
                </a>

                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center gap-3 w-full bg-gray-50 hover:bg-gray-100 transition px-3 py-2 rounded-md"
                >
                  <Phone className="w-5 h-5 text-gray-700" />
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      Phone
                    </div>
                    <div className="text-xs text-gray-600">{PHONE_NUMBER}</div>
                  </div>
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariant}
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

          {/* Form Section */}
          <motion.div
            variants={cardVariant}
            className="md:col-span-2 bg-white p-6 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold">Send us a message</h3>
            <p className="text-sm text-gray-500 mt-1">
              Fill the form below — we’ll reply on email or WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs text-gray-600 mb-1"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    required
                    className="w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-sky-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs text-gray-600 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                    className="w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-sky-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs text-gray-600 mb-1"
                  >
                    Phone (optional)
                  </label>
                  <input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-sky-500"
                    placeholder="+91 9XXXXXXXXX"
                  />
                </div>

                <div>
                  <label
                    htmlFor="orderId"
                    className="block text-xs text-gray-600 mb-1"
                  >
                    Order ID (optional)
                  </label>
                  <input
                    id="orderId"
                    value={form.orderId}
                    onChange={(e) => update("orderId", e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-sky-500"
                    placeholder="Order #ABC123"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs text-gray-600 mb-1"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  className="w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-sky-500"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs text-gray-600 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  required
                  rows={6}
                  className="w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-sky-500"
                  placeholder="Write your message here..."
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 disabled:opacity-60 transition cursor-pointer"
                >
                  {loading && <Loader2 className="animate-spin" size={16} />}
                  Send Message
                </button>

                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
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
