import { Link } from "react-router-dom";
import Brand from "../shared/Brand";

// ------------------ CONFIG ARRAYS ------------------

// Footer link sections (short, maintainable, fully mappable)
const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/products" },
      { label: "Browse Categories", to: "/categories" },
      { label: "Deals & Offers", to: "/deals" },
      { label: "New Arrivals", to: "/new-arrivals" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact Us", to: "/contact-us" },
      { label: "Shipping & Delivery", to: "/shipping-policy" },
      { label: "Returns & Refunds", to: "/cancellations-refunds" },
      { label: "FAQs", to: "/faq" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms & Conditions", to: "/terms-condition" },
      { label: "Cancellation Policy", to: "/cancellations-refunds" },
      { label: "Shipping Policy", to: "/shipping-policy" },
    ],
  },
];

// Payment methods with icon URLs (Wiki links you picked)
const paymentIcons = [
  {
    name: "Amazon Pay",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Amazon_Pay_logo.svg/640px-Amazon_Pay_logo.svg.png",
  },
  {
    name: "Google Pay",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg",
  },
  {
    name: "UPI",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/UPI_logo.svg/640px-UPI_logo.svg.png",
  },
  {
    name: "Visa",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
  },
  {
    name: "MasterCard",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
  },
  {
    name: "NetBanking",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Netbanking.svg/640px-Netbanking.svg.png",
  },
];

// ------------------ COMPONENT ------------------

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        {/* ---------- TOP: BRAND (LEFT) + ABOUT (RIGHT) ---------- */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8 border-b border-gray-800 pb-6">
          {/* Brand logo (no animation in footer) */}
          <div className="flex items-center">
            <Brand noAnimation size={52} />
          </div>

          {/* Short about text */}
          <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
            MyAZStore is your trusted online marketplace for everyday essentials
            and unique finds. We focus on quality products, fair pricing, and a
            smooth, reliable shopping experience across India.
          </p>
        </div>

        {/* ---------- MIDDLE: LINK SECTIONS (ALL LINKS) ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-6 border-b border-gray-800">
          {footerSections.map((section) => (
            <FooterColumn
              key={section.title}
              title={section.title}
              links={section.links}
            />
          ))}
        </div>

        {/* ---------- BOTTOM: COPYRIGHT (LEFT) + PAYMENTS (RIGHT) ---------- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          {/* Left: copyright */}
          <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            &copy; {year}{" "}
            <a
              href="https://mdfaizanahmad.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-white font-medium hover:underline"
            >
              mdfaizanahmad
            </a>{" "}
            — All rights reserved.
          </div>

          {/* Right: payment icons */}
          <div className="flex flex-col sm:items-end gap-1">
            <p className="text-[11px] uppercase tracking-wide text-gray-500 text-center sm:text-right">
              We Accept
            </p>

            {/* Icon row – aligned, no extra bg, good spacing */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3">
              {paymentIcons.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center justify-center h-6 sm:h-7"
                >
                  <img
                    src={p.src}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-auto object-contain bg-transparent"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ------------------ REUSABLE COLUMN COMPONENT ------------------

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; to: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-white tracking-wide mb-3 uppercase">
        {title}
      </h4>
      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-gray-400 hover:text-white transition"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
