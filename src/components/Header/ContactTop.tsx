import { Facebook, Instagram, Mail, Phone, Youtube } from "lucide-react";
import type { FC } from "react";

interface ContactLink {
  href: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}

const ContactTop: FC = () => {
  const contactLinks: ContactLink[] = [
    {
      href: "tel:+919876543210",
      icon: <Phone className="w-5 h-5" />,
      label: "Call: +91 95769 06845",
      color: "text-green-400 hover:text-green-300",
    },
    {
      href: "mailto:azstore@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      label: "Email: azstore@gmail.com",
      color: "text-blue-400 hover:text-blue-300",
    },
    {
      href: "https://instagram.com/yourstore",
      icon: <Instagram className="w-5 h-5" />,
      label: "Instagram",
      color: "text-pink-500 hover:text-pink-400",
    },
    {
      href: "https://youtube.com/@yourstore",
      icon: <Youtube className="w-5 h-5" />,
      label: "YouTube",
      color: "text-red-600 hover:text-red-500",
    },
    {
      href: "https://facebook.com/yourstore",
      icon: <Facebook className="w-5 h-5" />,
      label: "Facebook",
      color: "text-sky-500 hover:text-sky-400",
    },
  ];

  return (
    <div className=" text-xs md:text-sm font-medium border-b">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Announcement */}
          <p className="text-center md:text-left tracking-wide leading-relaxed">
            Fast Delivery Guaranteed —{" "}
            <span className=" font-semibold">Free Shipping</span> &{" "}
            <span className="font-semibold">Free Returns</span>
          </p>

          {/* Contact & Social */}
          <nav
            className="flex items-center gap-5 md:gap-6"
            aria-label="Contact and social media links"
          >
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className={`transition-all duration-300 hover:scale-125 focus:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full p-1.5 ${link.color}`}
                aria-label={link.label}
                title={link.label}
              >
                {link.icon}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ContactTop;
