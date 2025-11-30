import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

export default function Brand({ link = "/" }: { link?: string }) {
  return (
    <Link to={link} className="flex items-center gap-2">
      <motion.img
        src={logo}
        alt="Brand Logo"
        initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-12 h-12 object-contain rounded-xl"
      />
    </Link>
  );
}
