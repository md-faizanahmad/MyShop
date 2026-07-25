// import React from "react";
// import { Loader2 } from "lucide-react";
// import { SUPPORT_TOPICS } from "../../../config/contact.config";

// export type SupportTopic = "orders" | "returns" | "payment" | "general";

// export interface ContactFormData {
//   name: string;
//   email: string;
//   phone: string;
//   topic: SupportTopic;
//   orderId: string;
//   message: string;
// }

// interface ContactFormProps {
//   form: ContactFormData;
//   loading: boolean;
//   onChange: (key: keyof ContactFormData, value: string) => void;
//   onSubmit: (e: React.FormEvent) => void;
// }

// export const ContactForm: React.FC<ContactFormProps> = ({
//   form,
//   loading,
//   onChange,
//   onSubmit,
// }) => {
//   return (
//     <form onSubmit={onSubmit} className="space-y-4">
//       {/* Category Pills */}
//       <div>
//         <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
//           How can we help?
//         </label>
//         <div className="grid gap-3 sm:grid-cols-2">
//           {SUPPORT_TOPICS.map((topic) => {
//             const active = form.topic === topic.id;

//             return (
//               <button
//                 key={topic.id}
//                 type="button"
//                 onClick={() => onChange("topic", topic.id)}
//                 aria-pressed={active}
//                 className={`rounded-xl border p-4 text-left transition-all ${
//                   active
//                     ? "border-[#550077] bg-[#550077]/5 ring-1 ring-[#550077]"
//                     : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
//                 }`}
//               >
//                 <p
//                   className={`text-sm font-semibold ${
//                     active ? "text-[#550077]" : "text-slate-900"
//                   }`}
//                 >
//                   {topic.label}
//                 </p>

//                 <p className="mt-1 text-xs text-slate-500">
//                   {topic.description}
//                 </p>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//         <div>
//           <label
//             htmlFor="c-name"
//             className="mb-1 block text-xs font-medium text-slate-700"
//           >
//             Full Name <span className="text-rose-500">*</span>
//           </label>
//           <input
//             id="c-name"
//             value={form.name}
//             onChange={(e) => onChange("name", e.target.value)}
//             required
//             className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
//             placeholder="Alex Morgan"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="c-email"
//             className="mb-1 block text-xs font-medium text-slate-700"
//           >
//             Email Address <span className="text-rose-500">*</span>
//           </label>
//           <input
//             id="c-email"
//             type="email"
//             value={form.email}
//             onChange={(e) => onChange("email", e.target.value)}
//             required
//             className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
//             placeholder="alex@example.com"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//         <div>
//           <label
//             htmlFor="c-phone"
//             className="mb-1 block text-xs font-medium text-slate-700"
//           >
//             Phone Number <span className="text-slate-400">(Optional)</span>
//           </label>
//           <input
//             id="c-phone"
//             value={form.phone}
//             onChange={(e) => onChange("phone", e.target.value)}
//             className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
//             placeholder="+91 98765 43210"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="c-order"
//             className="mb-1 block text-xs font-medium text-slate-700"
//           >
//             Order Reference ID{" "}
//             <span className="text-slate-400">(Optional)</span>
//           </label>
//           <input
//             id="c-order"
//             value={form.orderId}
//             onChange={(e) => onChange("orderId", e.target.value)}
//             className="w-full rounded-md border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
//             placeholder="e.g. #ORD-9842"
//           />
//         </div>
//       </div>

//       <div>
//         <label
//           htmlFor="c-msg"
//           className="mb-1 block text-xs font-medium text-slate-700"
//         >
//           Describe your issue <span className="text-rose-500">*</span>
//         </label>
//         <textarea
//           id="c-msg"
//           value={form.message}
//           onChange={(e) => onChange("message", e.target.value)}
//           required
//           rows={5}
//           className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
//           placeholder="Please include relevant detail like item name or delivery address if applicable..."
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 disabled:opacity-60 sm:w-auto"
//       >
//         {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//         Submit Support Ticket
//       </button>
//     </form>
//   );
// };

///////////////////////////////////////////////////////
import React from "react";
import { Loader2 } from "lucide-react";
import { SUPPORT_TOPICS } from "../../../config/contact.config";

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

export const ContactForm: React.FC<ContactFormProps> = ({
  form,
  loading,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Category Pills */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
          How can we help?
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          {SUPPORT_TOPICS.map((topic) => {
            const active = form.topic === topic.id;

            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => onChange("topic", topic.id)}
                aria-pressed={active}
                className={`rounded-xl p-4 text-left transition-all ${
                  active
                    ? "bg-slate-100/80 text-slate-900"
                    : "bg-transparent text-slate-600 hover:bg-slate-50"
                }`}
              >
                <p
                  className={`text-sm font-semibold ${
                    active ? "text-slate-950" : "text-slate-900"
                  }`}
                >
                  {topic.label}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {topic.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="c-name"
            className="mb-1.5 block text-xs font-medium text-slate-700"
          >
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="c-name"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            required
            className="w-full border-b border-slate-200 bg-transparent px-0 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
            placeholder="Alex Morgan"
          />
        </div>

        <div>
          <label
            htmlFor="c-email"
            className="mb-1.5 block text-xs font-medium text-slate-700"
          >
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            id="c-email"
            type="email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            required
            className="w-full border-b border-slate-200 bg-transparent px-0 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
            placeholder="alex@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="c-phone"
            className="mb-1.5 block text-xs font-medium text-slate-700"
          >
            Phone Number <span className="text-slate-400">(Optional)</span>
          </label>
          <input
            id="c-phone"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className="w-full border-b border-slate-200 bg-transparent px-0 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
            placeholder="+91 98765 43210"
          />
        </div>

        <div>
          <label
            htmlFor="c-order"
            className="mb-1.5 block text-xs font-medium text-slate-700"
          >
            Order Reference ID{" "}
            <span className="text-slate-400">(Optional)</span>
          </label>
          <input
            id="c-order"
            value={form.orderId}
            onChange={(e) => onChange("orderId", e.target.value)}
            className="w-full border-b border-slate-200 bg-transparent px-0 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
            placeholder="e.g. #ORD-9842"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="c-msg"
          className="mb-1.5 block text-xs font-medium text-slate-700"
        >
          Describe your issue <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="c-msg"
          value={form.message}
          onChange={(e) => onChange("message", e.target.value)}
          required
          rows={4}
          className="w-full border-b border-slate-200 bg-transparent px-0 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
          placeholder="Please include relevant detail like item name or delivery address if applicable..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-slate-800 disabled:opacity-60 sm:w-auto"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Submit Support Ticket
      </button>
    </form>
  );
};
