// // hooks/useContact.ts

// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export function useContact() {
//   const [formData, setFormData] =
//     useState<ContactFormDat>(INITIAL_CONTACT_FORM);

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const updateField = (key: keyof ContactFormData, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     if (
//       !formData.name.trim() ||
//       !formData.email.trim() ||
//       !formData.message.trim()
//     ) {
//       toast.error("Please complete all required fields.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       await axios.post(
//         `${CONTACT_API}/v1/contact`,
//         {
//           name: formData.name.trim(),
//           email: formData.email.trim(),
//           phone: formData.phone.trim() || undefined,
//           category: formData.topic,
//           orderId: formData.orderId.trim() || undefined,
//           message: formData.message.trim(),
//         },
//         {
//           withCredentials: true,
//           timeout: 8000,
//         },
//       );

//       toast.success("Ticket submitted! We'll reply within 24 hours.");

//       setFormData(INITIAL_CONTACT_FORM);
//     } catch {
//       try {
//         const subject = encodeURIComponent(
//           `[${formData.topic.toUpperCase()}] Inquiry from ${formData.name}`,
//         );

//         const body = encodeURIComponent(
//           `Topic: ${formData.topic}
// Name: ${formData.name}
// Email: ${formData.email}
// Phone: ${formData.phone}
// Order ID: ${formData.orderId}

// Message:
// ${formData.message}`,
//         );

//         window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;

//         toast.info("Opening mail client as alternative...");
//       } catch {
//         toast.error(
//           "Couldn't reach servers. Please message us on WhatsApp directly.",
//         );
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return {
//     formData,
//     isSubmitting,
//     updateField,
//     handleSubmit,
//   };
// }
