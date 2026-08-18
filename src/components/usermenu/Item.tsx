// src/components/user-menu/Item.tsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Props = {
  // Destination of the menu item.
  to: string;

  // Text displayed to the user.
  label: string;

  // Optional icon displayed before the label.
  icon?: React.ReactNode;

  // Optional primary styling.
  // Kept unchanged for any existing usage of Item outside UserMenu.
  primary?: boolean;
};

export default function Item({ to, label, icon, primary }: Props) {
  return (
    <Link to={to}>
      <motion.div
        /*
         * Small horizontal movement keeps the interaction subtle.
         *
         * The previous x: 4 was a little too noticeable for a compact
         * shopping account menu.
         */
        whileHover={{ x: 2 }}
        className={`
          flex
          items-center
          gap-2.5
          rounded-sm
          px-3
          py-2
          text-[12px]
          transition-colors

          ${
            primary
              ? "bg-blue-600 font-semibold text-white"
              : "text-neutral-700 hover:bg-neutral-100"
          }
        `}
        role="menuitem"
      >
        {/* Optional menu icon. */}
        {icon && <span className="flex shrink-0 items-center">{icon}</span>}

        {/* Menu label. */}
        <span className="truncate">{label}</span>
      </motion.div>
    </Link>
  );
}
