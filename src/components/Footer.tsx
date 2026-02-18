import { Link } from "react-router-dom";
import Brand from "../shared/Brand";
import { socialLinks } from "../config/socials";

// ------------------ CONFIG ARRAYS ------------------
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
    title: "Help Center",
    links: [
      { label: "Contact Us", to: "/contact-us" },
      { label: "Shipping & Delivery", to: "/shipping-policy" },
      { label: "Returns & Refunds", to: "/cancellations-refunds" },
      { label: "FAQs", to: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms & Conditions", to: "/terms-condition" },
      { label: "Cancellation Policy", to: "/cancellations-refunds" },
      { label: "Shipping Policy", to: "/shipping-policy" },
    ],
  },
];

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
    <footer className="bg-[#0a0a0a] text-zinc-400 mt-20 border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        {/* --- TOP SECTION: BRAND & NEWSLETTER CONCEPT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-zinc-800">
          <div className="lg:col-span-5 space-y-6">
            <Brand noAnimation size={48} />
            <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
              MyAZStore is your trusted online marketplace for everyday
              essentials and unique finds. We focus on quality products, fair
              pricing, and a smooth shopping experience across India.
            </p>
            {/* Added Social Placeholder for "Real E-commerce" feel */}

            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className={`
          w-10 h-10 rounded-full 
          bg-zinc-900/50 border border-zinc-800 
          flex items-center justify-center 
          transition-all duration-300 group
          ${social.color}
          hover:border-zinc-600 hover:bg-zinc-800/80
          hover:-translate-y-1
        `}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* --- MIDDLE SECTION: MAPPED LINKS --- */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerSections.map((section) => (
              <FooterColumn
                key={section.title}
                title={section.title}
                links={section.links}
              />
            ))}
          </div>
        </div>

        {/* --- BOTTOM SECTION: COMPACT & CLEAN --- */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Copyright & Credits */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <p className="text-[13px] font-light tracking-wide">
              © {year} <span className="text-white font-medium">MyAZStore</span>
              . Built by{" "}
              <a
                href="https://mdfaizanahmad.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-300 hover:text-blue-400 transition-colors underline decoration-zinc-700 underline-offset-4"
              >
                mdfaizanahmad
              </a>
            </p>
          </div>

          {/* Payment Trust Badges */}
          <div className="order-1 md:order-2 flex flex-col items-center md:items-end gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold">
              Secure Payments
            </span>
            <div className="flex flex-wrap justify-center gap-4 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
              {paymentIcons.map((p) => (
                <img
                  key={p.name}
                  src={p.src}
                  alt={p.name}
                  className="h-5 w-auto object-contain"
                />
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
    <div className="flex flex-col space-y-4">
      <h4 className="text-[13px] font-bold text-white uppercase tracking-widest">
        {title}
      </h4>
      <ul className="flex flex-col space-y-2.5">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-[14px] hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
