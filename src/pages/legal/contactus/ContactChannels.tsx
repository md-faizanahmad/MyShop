import React from "react";

interface ChannelProps {
  supportEmail: string;
  phoneNumber: string;
  whatsappNumber: string;
}

export const ContactChannels: React.FC<ChannelProps> = ({
  supportEmail,
  phoneNumber,
  whatsappNumber,
}) => {
  return (
    <div className="space-y-4">
      {/* Status Card */}
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Support Desk Online
          </span>
        </div>
        <p className="mt-1 text-xs text-emerald-700">
          Average response time:{" "}
          <strong className="font-medium">&lt; 15 mins</strong> on WhatsApp.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid gap-3">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi! I need quick assistance with my order.")}`}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 transition-all hover:border-emerald-500 hover:shadow-md hover:shadow-emerald-500/5"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163A11.928 11.928 0 0 1 .243 12C.243 5.373 5.616 0 12.243 0c3.2 0 6.189 1.249 8.438 3.497A11.854 11.854 0 0 1 24 11.757c0 6.627-5.373 12-11.757 12a11.9 11.9 0 0 1-5.983-1.675L.057 24zM12.244 21.6c4.32 0 8.01-2.98 8.01-8.014 0-4.33-3.697-7.99-8.01-7.99-4.33 0-7.99 3.66-7.99 7.99 0 4.33 3.66 8.015 7.99 8.015z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Instant WhatsApp
              </div>
              <div className="text-xs text-slate-500">
                Fastest for order status & returns
              </div>
            </div>
          </div>
          <span className="text-xs font-medium text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-600">
            →
          </span>
        </a>

        <a
          href={`mailto:${supportEmail}`}
          className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 transition-all hover:border-slate-900 hover:shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition-colors group-hover:bg-slate-900 group-hover:text-white">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 13.065L1.8 6.3A1.8 1.8 0 0 1 3.3 4.2h17.4c.9 0 1.5.9 1.2 1.8-.05.15-.13.3-.24.42L12 13.065z" />
                <path d="M20.4 7.2v10.8c0 .99-.8 1.98-1.8 1.98H5.4c-1 0-1.8-.99-1.8-1.98V7.2" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Email Ticketing
              </div>
              <div className="text-xs text-slate-500">{supportEmail}</div>
            </div>
          </div>
          <span className="text-xs font-medium text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-900">
            →
          </span>
        </a>

        <a
          href={`tel:${phoneNumber}`}
          className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 transition-all hover:border-slate-900 hover:shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition-colors group-hover:bg-slate-900 group-hover:text-white">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M6.6 10.79a15.05 15.05 0 006.6 6.6l2.2-2.2a1 1 0 011.03-.24c1.12.37 2.33.57 3.59.57a1 1 0 011 1V20a1 1 0 01-1 1C9.16 21 3 14.84 3 6a1 1 0 011-1h3.25a1 1 0 011 1c0 1.26.2 2.47.57 3.59.14.38.06.8-.22 1.2l-2.99 3.2z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Phone Support
              </div>
              <div className="text-xs text-slate-500">{phoneNumber}</div>
            </div>
          </div>
          <span className="text-xs font-medium text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-900">
            →
          </span>
        </a>
      </div>
    </div>
  );
};
