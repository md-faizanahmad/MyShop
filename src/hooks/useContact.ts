import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { CONTACT } from "../config/contact.config";
import type { ContactFormData } from "../types/contact.types";

const API = import.meta.env.VITE_API_URL ?? "";

const INITIAL_FORM: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  topic: "orders",
  orderId: "",
  message: "",
};

export function useContact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const updateField = (key: keyof ContactFormData, value: string) => {
    setForm((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const reset = () => setForm(INITIAL_FORM);

  const submit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please complete all required fields.");
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
          category: form.topic,
          orderId: form.orderId.trim() || undefined,
          message: form.message.trim(),
        },
        {
          timeout: 8000,
          withCredentials: true,
        },
      );

      toast.success("Your support request has been sent successfully.");

      reset();
    } catch {
      try {
        const subject = encodeURIComponent(
          `[${form.topic.toUpperCase()}] ${form.name}`,
        );

        const body = encodeURIComponent(`
Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Order ID: ${form.orderId}

${form.message}
`);

        window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;

        toast.info("Opening your email application...");
      } catch {
        toast.error("Unable to contact support. Please use WhatsApp instead.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    updateField,
    submit,
  };
}
