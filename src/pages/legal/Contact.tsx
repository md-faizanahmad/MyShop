// import React, { useState } from "react";
// import LegalLayout from "./LegalLayout";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { ContactForm, type ContactFormData } from "./contactus/ContactForm";
// import { ContactChannels } from "./contactus/ContactChannels";
// import { CONTACT } from "../../config/contact.config";

// const API = import.meta.env.VITE_API_URL ?? "";

// // const SUPPORT_EMAIL = "support@myazstore.shop";
// // const PHONE_NUMBER = "+917563092029";
// // const WHATSAPP_NUMBER = "917563092029";

// const initialForm: ContactFormData = {
//   name: "",
//   email: "",
//   phone: "",
//   topic: "orders",
//   orderId: "",
//   message: "",
// };

// export default function Contact() {
//   const [form, setForm] = useState<ContactFormData>(initialForm);
//   const [loading, setLoading] = useState(false);

//   const handleUpdate = (key: keyof ContactFormData, value: string) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
//       toast.error("Please complete all required fields.");
//       return;
//     }

//     setLoading(true);

//     try {
//       await axios.post(
//         `${API}/v1/contact`,
//         {
//           name: form.name.trim(),
//           email: form.email.trim(),
//           phone: form.phone.trim() || undefined,
//           category: form.topic,
//           orderId: form.orderId.trim() || undefined,
//           message: form.message.trim(),
//         },
//         { withCredentials: true, timeout: 8000 },
//       );

//       toast.success("Ticket submitted! We'll reply within 24 hours.");
//       setForm(initialForm);
//     } catch {
//       // Graceful fallback to mail client
//       try {
//         const subject = encodeURIComponent(
//           `[${form.topic.toUpperCase()}] Inquiry from ${form.name}`,
//         );
//         const body = encodeURIComponent(
//           `Topic: ${form.topic}\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nOrder ID: ${form.orderId}\n\nMessage:\n${form.message}`,
//         );
//         window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
//         toast.info("Opening mail client as alternative...");
//       } catch {
//         toast.error(
//           "Couldn't reach servers. Please message us on WhatsApp directly.",
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   const fadeUp = {
//     hidden: { opacity: 0, y: 12 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
//   };

//   return (
//     <LegalLayout title="Customer Care">
//       <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
//         {/* Header section */}
//         <motion.div
//           initial="hidden"
//           animate="show"
//           variants={fadeUp}
//           className="mb-8 border-b border-slate-200/80 pb-6"
//         >
//           <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
//             Help & Support
//           </span>
//           <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
//             We’re here to help.
//           </h1>
//           <p className="mt-2 text-sm text-slate-600 sm:text-base">
//             Have questions about an order, tracking, or returns? Reach out to
//             our team below.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
//           {/* Main Form Block (8 cols) */}
//           <motion.div
//             initial="hidden"
//             animate="show"
//             variants={fadeUp}
//             className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7"
//           >
//             <h2 className="text-xl font-bold text-slate-900">Send a Message</h2>
//             <p className="mb-6 text-xs text-slate-500">
//               Select a category to help us direct your ticket to the right
//               department.
//             </p>
//             <ContactForm
//               form={form}
//               loading={loading}
//               onChange={handleUpdate}
//               onSubmit={handleSubmit}
//             />
//           </motion.div>

//           {/* Channels & Info Sidebar (5 cols) */}
//           <motion.div
//             initial="hidden"
//             animate="show"
//             variants={fadeUp}
//             className="space-y-6 lg:col-span-5"
//           >
//             <ContactChannels
//               supportEmail={CONTACT.email}
//               phoneNumber={CONTACT.phone}
//               whatsappNumber={CONTACT.whatsapp}
//             />

//             {/* Operating Hours Block */}
//             <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
//               <h3 className="text-sm font-bold text-slate-900">
//                 Operating Hours
//               </h3>
//               <div className="mt-3 divide-y divide-slate-100 text-xs">
//                 <div className="flex justify-between py-1.5 text-slate-600">
//                   <span>Monday – Saturday</span>
//                   <span className="font-semibold text-slate-900">
//                     9:00 AM – 7:00 PM IST
//                   </span>
//                 </div>
//                 <div className="flex justify-between py-1.5 text-slate-600">
//                   <span>Sunday</span>
//                   <span className="font-semibold text-slate-400">
//                     Closed (WhatsApp open)
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </LegalLayout>
//   );
// }
////////////////////////////////////////////////////////26072026
import React, { useState } from "react";
import LegalLayout from "./LegalLayout";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { ContactForm, type ContactFormData } from "./contactus/ContactForm";
import { ContactChannels } from "./contactus/ContactChannels";
import { CONTACT } from "../../config/contact.config";

const API = import.meta.env.VITE_API_URL ?? "";

const initialForm: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  topic: "orders",
  orderId: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [loading, setLoading] = useState(false);

  const handleUpdate = (key: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

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
        { withCredentials: true, timeout: 8000 },
      );

      toast.success("Ticket submitted! We'll reply within 24 hours.");
      setForm(initialForm);
    } catch {
      // Graceful fallback to mail client
      try {
        const subject = encodeURIComponent(
          `[${form.topic.toUpperCase()}] Inquiry from ${form.name}`,
        );
        const body = encodeURIComponent(
          `Topic: ${form.topic}\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nOrder ID: ${form.orderId}\n\nMessage:\n${form.message}`,
        );
        window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
        toast.info("Opening mail client as alternative...");
      } catch {
        toast.error(
          "Couldn't reach servers. Please message us on WhatsApp directly.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <LegalLayout title="Customer Care">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        {/* Header section */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mb-8 pb-4"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Help & Support
          </span>
          <h5 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            We’re here to help.
          </h5>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Have questions about an order, tracking, or returns? Reach out to
            our team below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Form Block (7 cols) */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="lg:col-span-7"
          >
            <h2 className="text-xl font-bold text-slate-900">Send a Message</h2>
            <p className="mb-6 text-xs text-slate-500">
              Select a category to help us direct your ticket to the right
              department.
            </p>
            <ContactForm
              form={form}
              loading={loading}
              onChange={handleUpdate}
              onSubmit={handleSubmit}
            />
          </motion.div>

          {/* Channels & Info Sidebar (5 cols) */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="space-y-8 lg:col-span-5"
          >
            <ContactChannels
              supportEmail={CONTACT.email}
              phoneNumber={CONTACT.phone}
              whatsappNumber={CONTACT.whatsapp}
            />

            {/* Operating Hours Block */}
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Operating Hours
              </h3>
              <div className="mt-3 divide-y divide-slate-100 text-xs">
                <div className="flex justify-between py-2 text-slate-600">
                  <span>Monday – Saturday</span>
                  <span className="font-semibold text-slate-900">
                    9:00 AM – 7:00 PM IST
                  </span>
                </div>
                <div className="flex justify-between py-2 text-slate-600">
                  <span>Sunday</span>
                  <span className="font-semibold text-slate-400">
                    Closed (WhatsApp open)
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </LegalLayout>
  );
}
