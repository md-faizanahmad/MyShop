import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import LegalLayout from "./LegalLayout";
import { FAQS } from "../../config/faq.config";

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <LegalLayout title="Frequently Asked Questions">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
        {/* Header */}
        <div className="mb-10 border-b border-slate-200 pb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Help Center
          </span>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Find quick answers to common questions about orders, shipping,
            payments, returns, and your account. If you still need help, our
            support team is always happy to assist.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {FAQS.map((category) => (
            <section
              key={category.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="mb-5 text-xl font-bold text-slate-900">
                {category.title}
              </h2>

              <div className="divide-y divide-slate-200">
                {category.items.map((item, index) => {
                  const id = `${category.title}-${index}`;
                  const isOpen = openItem === id;

                  return (
                    <div key={id}>
                      <button
                        type="button"
                        onClick={() => toggleItem(id)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[#550077]"
                      >
                        <span className="text-sm font-semibold text-slate-900">
                          {item.question}
                        </span>

                        <ChevronDown
                          className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                            isOpen
                              ? "rotate-180 text-[#550077]"
                              : "text-slate-400"
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <p className="pb-5 pr-8 text-sm leading-7 text-slate-600">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Contact Card */}
        <div className="mt-12 rounded-3xl border border-[#550077]/20 bg-[#550077]/5 p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Still have questions?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            If you couldn't find the answer you're looking for, our support team
            is ready to help.
          </p>

          <a
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#550077] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#43005d]"
          >
            Contact Support
          </a>
        </div>
      </div>
    </LegalLayout>
  );
}
