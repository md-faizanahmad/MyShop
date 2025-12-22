// src/components/user-menu/Item.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Props = {
  to: string;
  label: string;
  icon?: React.ReactNode;
  primary?: boolean;
};

export default function Item({ to, label, icon, primary }: Props) {
  return (
    <Link to={to}>
      <motion.div
        whileHover={{ x: 4 }}
        className={`flex items-center gap-3 px-4 py-3 rounded transition ${
          primary ? "bg-blue-600 text-white font-semibold" : "hover:bg-gray-100"
        }`}
        role="menuitem"
      >
        {icon && <span>{icon}</span>}
        <span>{label}</span>
      </motion.div>
    </Link>
  );
}
