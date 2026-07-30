import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { ANNOUNCEMENTS } from "./announcement.data";

const ROTATION_INTERVAL = 5000;

const rootClass =
  "relative h-10 overflow-hidden border-b border-white/10 bg-zinc-950 text-white";

const containerClass =
  "mx-auto flex h-full max-w-7xl items-center justify-between  sm:px-6 lg:px-8";

const messageWrapperClass = "flex min-w-0 flex-1 items-center justify-center";

const messageClass =
  "flex items-center gap-2 truncate text-xs font-medium sm:text-sm";

const iconClass = "h-4 w-4 shrink-0 text-red-500";

const ctaClass =
  "ml-4 inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-red-500 transition-colors duration-200 hover:text-red-400 sm:text-sm";

export default function TopAnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, ROTATION_INTERVAL);

    return () => window.clearInterval(interval);
  }, []);

  const announcement = ANNOUNCEMENTS[currentIndex];
  const Icon = announcement.icon;

  return (
    <section className={rootClass}>
      <div className={containerClass}>
        <div className={messageWrapperClass}>
          <AnimatePresence mode="wait">
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className={messageClass}
            >
              <Icon className={iconClass} />

              <span className="truncate">{announcement.message}</span>

              <Link to={announcement.href} className={ctaClass}>
                {announcement.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
