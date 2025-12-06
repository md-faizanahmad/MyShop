import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

interface BrandProps {
  link?: string;
  noAnimation?: boolean;
  size?: number; // optional control
}

export default function Brand({
  link = "/",
  noAnimation = false,
  size = 48,
}: BrandProps) {
  const imgProps = {
    src: logo,
    alt: "Brand Logo",
    className: `object-contain rounded-xl`,
    style: { width: size, height: size },
  };

  if (noAnimation) {
    return (
      <Link to={link} className="flex items-center gap-2">
        <img {...imgProps} />
      </Link>
    );
  }

  return (
    <Link to={link} className="flex items-center gap-2">
      <motion.img
        {...imgProps}
        initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
    </Link>
  );
}
