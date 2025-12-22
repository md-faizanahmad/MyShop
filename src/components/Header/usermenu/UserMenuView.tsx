// src/components/user-menu/UserMenuView.tsx
import {
  User,
  Heart,
  Package,
  LogOut,
  Pin,
  ChevronDown,
  LogIn,
  UserPlus,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { UserType } from "./usermenu-types";
import Item from "./Item";

type Props = {
  open: boolean;
  toggleOpen: () => void;

  buttonRef: React.RefObject<HTMLButtonElement | null>;
  menuRef: React.RefObject<HTMLDivElement | null>;

  isLoggedIn: boolean;
  user: UserType | null;

  onLogout: () => Promise<void> | void;
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0 },
};

export default function UserMenuView({
  open,
  toggleOpen,
  buttonRef,
  menuRef,
  isLoggedIn,
  user,
  onLogout,
}: Props) {
  const shouldReduceMotion = useReducedMotion();

  const firstLetter = isLoggedIn
    ? user?.name?.[0]?.toUpperCase() ?? "U"
    : undefined;

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        ref={buttonRef}
        onClick={toggleOpen}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex me-4   text-black font-medium transition"
      >
        <div className="  flex items-center justify-center font-bold">
          {isLoggedIn ? (
            <h2 className=" text-2xl text-red-800">{firstLetter}</h2>
          ) : (
            <UserPlus size={18} />
          )}
        </div>

        <motion.span
          aria-hidden
          animate={open ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
        >
          <ChevronDown size={16} className="mt-2" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="user-menu"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            transition={{ duration: shouldReduceMotion ? 0 : 0.14 }}
            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-50"
            role="menu"
          >
            {/* LOGGED IN MENU */}
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
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                  role="menuitem"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              // LOGGED OUT MENU
              <div className="py-1">
                <Item to="/login" icon={<LogIn size={16} />} label="Login" />
                <Item
                  to="/signup"
                  icon={<UserPlus size={16} />}
                  label="Create Account"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
