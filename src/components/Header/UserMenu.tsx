// src/components/UserMenu.tsx
import { useEffect, useRef, useState, type JSX } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  User,
  Heart,
  Package,
  LogOut,
  Pin,
  ChevronDown,
  LogInIcon,
  UserPlus,
  UserPen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/Auth";

const API = import.meta.env.VITE_API_URL;

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, refreshUser } = useAuth();
  const isLoggedIn = user?.isLoggedIn;

  // Close menu on route change
  useEffect(() => setOpen(false), [location.pathname]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${API}/v1/users/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout error:", err);
    }

    await refreshUser(); // <- CRITICAL
    toast.success("Logged out successfully");
    navigate("/login"); // redirect
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* AVATAR BUTTON */}
      <motion.button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-2 rounded-full text-black font-medium  transition"
      >
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold">
          {isLoggedIn ? (
            user?.name?.[0]?.toUpperCase()
          ) : (
            <span>
              <UserPlus size={18} />
            </span>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </motion.button>

      {/* MENU DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 w-47 bg-white rounded-xl shadow-xl border border-gray-200 z-50"
          >
            {isLoggedIn ? (
              <div className="py-1">
                <Item
                  to="/profile"
                  icon={<User size={16} />}
                  label="My Profile"
                />
                <Item
                  to="/orders"
                  icon={<Package size={16} />}
                  label="My Orders"
                />
                <Item
                  to="/wishlist"
                  icon={<Heart size={16} />}
                  label="Wishlist"
                />
                <Item
                  to="/addresses"
                  icon={<Pin size={16} />}
                  label="Saved Addresses"
                />

                <div className="border-t my-2" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="py-1">
                <Item
                  to="/login"
                  label="Login"
                  icon={<LogInIcon size={16} />}
                />
                <Item
                  to="/signup"
                  label="Create Account"
                  icon={<UserPen size={16} />}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Item({
  to,
  label,
  icon,
  primary,
}: {
  to: string;
  label: string;
  icon?: JSX.Element;
  primary?: boolean;
}) {
  return (
    <Link to={to}>
      <motion.div
        whileHover={{ x: 4 }}
        className={`flex items-center gap-3 px-4 py-3 rounded transition 
          ${
            primary
              ? "bg-blue-600 text-white font-semibold"
              : "hover:bg-gray-100 "
          }`}
      >
        {icon && <span>{icon}</span>}
        {label}
      </motion.div>
    </Link>
  );
}
