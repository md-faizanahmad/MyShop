// config/faq.config.ts

import type { FAQCategory } from "../types/faq";

export const FAQS: FAQCategory[] = [
  {
    title: "Orders",
    items: [
      {
        question: "How do I place an order?",
        answer:
          "Browse our products, add your desired items to the cart, proceed to checkout, provide your shipping details, and complete the payment. You'll receive an order confirmation once your purchase is successful.",
      },
      {
        question: "Can I cancel my order?",
        answer:
          "Yes. Orders can usually be cancelled before they are packed or shipped. Once an order has been dispatched, cancellation may no longer be possible.",
      },
      {
        question: "Can I change my order after placing it?",
        answer:
          "If your order hasn't been processed yet, contact our support team as soon as possible. We'll do our best to accommodate your request.",
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    items: [
      {
        question: "How long does delivery take?",
        answer:
          "Most orders are delivered within 3–7 business days depending on your location and courier availability.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order is shipped, you'll receive a tracking ID and courier details via email or SMS, allowing you to monitor your shipment.",
      },
      {
        question: "Do you deliver across India?",
        answer:
          "Yes. We deliver to most serviceable locations across India through our trusted courier partners.",
      },
    ],
  },
  {
    title: "Payments",
    items: [
      {
        question: "Which payment methods are accepted?",
        answer:
          "We accept UPI, debit cards, credit cards, net banking, and other secure online payment methods supported during checkout.",
      },
      {
        question: "Is Cash on Delivery (COD) available?",
        answer:
          "Cash on Delivery may be available for selected products and eligible delivery locations. Availability is shown during checkout.",
      },
      {
        question: "Are my payments secure?",
        answer:
          "Yes. All online payments are processed through secure, encrypted payment gateways to help protect your financial information.",
      },
    ],
  },
  {
    title: "Returns & Refunds",
    items: [
      {
        question: "Can I return a product?",
        answer:
          "Eligible products can be returned within the applicable return period, provided they meet our return policy conditions and are in their original condition.",
      },
      {
        question: "When will I receive my refund?",
        answer:
          "Approved refunds are generally processed within 5–10 business days, depending on your original payment method and banking partner.",
      },
      {
        question: "What should I do if I receive a damaged or incorrect item?",
        answer:
          "Please contact our support team immediately with your order number and clear photos of the item. We'll investigate and arrange an appropriate resolution.",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        question: "Do I need an account to place an order?",
        answer:
          "Creating an account provides a better shopping experience, including order tracking and faster checkout. Guest checkout may be available where supported.",
      },
      {
        question: "I forgot my password. What should I do?",
        answer:
          "Click 'Forgot Password' on the login page and follow the instructions sent to your registered email address.",
      },
      {
        question: "How can I update my profile information?",
        answer:
          "After signing in, visit your account settings to update your personal information, shipping addresses, and password.",
      },
    ],
  },
  {
    title: "Products",
    items: [
      {
        question: "Are all products authentic?",
        answer:
          "We strive to offer genuine, high-quality products sourced from trusted suppliers and sellers.",
      },
      {
        question: "Will an out-of-stock product become available again?",
        answer:
          "Some products are restocked regularly, while others may be discontinued. Availability depends on inventory and supplier stock.",
      },
      {
        question: "Are prices inclusive of taxes?",
        answer:
          "Product pricing is displayed according to applicable tax regulations. Any additional charges, if applicable, will be shown during checkout before payment.",
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        question: "How can I contact customer support?",
        answer:
          "You can reach our support team through the Contact Us page using email, phone, WhatsApp, or the contact form.",
      },
      {
        question: "What are your customer support hours?",
        answer:
          "Our customer support team is available Monday through Saturday during business hours. WhatsApp support may be available outside regular hours.",
      },
      {
        question: "How quickly will I receive a response?",
        answer:
          "We aim to respond to most customer inquiries within 24 business hours.",
      },
    ],
  },
];
