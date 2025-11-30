import { Facebook, Instagram, Mail, Phone, Youtube } from "lucide-react";
import type { FC } from "react";

interface ContactLink {
  href: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}

const TopAnnouncementBar: FC = () => {
  const contactLinks: ContactLink[] = [
    {
      href: "tel:+919576906845",
      icon: <Phone className="w-5 h-5" />,
      label: "Call us: +91 95769 06845",
      color: "text-green-400 hover:text-green-300",
    },
    {
      href: "mailto:azstore@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      label: "Email us: azstore@gmail.com",
      color: "text-blue-400 hover:text-blue-300",
    },
    {
      href: "https://instagram.com/yourstore", // Replace with real link
      icon: <Instagram className="w-5 h-5" />,
      label: "Follow us on Instagram",
      color: "text-pink-500 hover:text-pink-400",
    },
    {
      href: "https://youtube.com/@yourstore", // Replace with real link
      icon: <Youtube className="w-5 h-5" />,
      label: "Subscribe on YouTube",
      color: "text-red-600 hover:text-red-500",
    },
    {
      href: "https://facebook.com/yourstore", // Replace with real link
      icon: <Facebook className="w-5 h-5" />,
      label: "Like us on Facebook",
      color: "text-sky-500 hover:text-sky-400",
    },
  ];

  return (
    <div className="bg-gray-900 text-white text-xs md:text-sm font-medium">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Announcement Message */}
          <p className="text-center md:text-left tracking-wide leading-relaxed">
            Order Today, Enjoy Tomorrow:{" "}
            <span className="text-green-400 font-semibold">Free Shipping</span>{" "}
            &{" "}
            <span className="text-yellow-400 font-semibold">Free Returns!</span>
          </p>

          {/* Contact & Social Icons */}
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

export default TopAnnouncementBar;
