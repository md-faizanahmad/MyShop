// // src/components/user-menu/UserMenuView.tsx
// import {
//   User,
//   Heart,
//   Package,
//   LogOut,
//   Pin,
//   ChevronDown,
//   LogIn,
//   UserPlus,
// } from "lucide-react";
// import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
// import type { UserType } from "./usermenu-types";
// import Item from "./Item";

// type Props = {
//   open: boolean;
//   toggleOpen: () => void;

//   buttonRef: React.RefObject<HTMLButtonElement | null>;
//   menuRef: React.RefObject<HTMLDivElement | null>;

//   isLoggedIn: boolean;
//   user: UserType | null;

//   onLogout: () => Promise<void> | void;
// };

// const dropdownVariants = {
//   hidden: { opacity: 0, y: -6 },
//   visible: { opacity: 1, y: 0 },
// };

// export default function UserMenuView({
//   open,
//   toggleOpen,
//   buttonRef,
//   menuRef,
//   isLoggedIn,
//   user,
//   onLogout,
// }: Props) {
//   const shouldReduceMotion = useReducedMotion();

//   const firstLetter = isLoggedIn
//     ? (user?.name?.[0]?.toUpperCase() ?? "U")
//     : undefined;

//   return (
//     <div className="relative" ref={menuRef}>
//       <motion.button
//         ref={buttonRef}
//         onClick={toggleOpen}
//         whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
//         aria-expanded={open}
//         aria-haspopup="menu"
//         className="flex me-4   text-black font-medium transition"
//       >
//         <div className="  flex items-center justify-center font-bold">
//           {isLoggedIn ? (
//             // <h2 className=" text-2xl text-red-800">{firstLetter}</h2>
//             <h2 className=" text-2xl text-red-800">{firstLetter}</h2>
//           ) : (
//             <UserPlus size={18} />
//           )}
//         </div>

//         <motion.span
//           aria-hidden
//           animate={open ? { rotate: 180 } : { rotate: 0 }}
//           transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
//         >
//           <ChevronDown size={16} className="mt-2" />
//         </motion.span>
//       </motion.button>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             key="user-menu"
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             variants={dropdownVariants}
//             transition={{ duration: shouldReduceMotion ? 0 : 0.14 }}
//             className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-50"
//             role="menu"
//           >
//             {/* LOGGED IN MENU */}
//             {isLoggedIn ? (
//               <div className="py-1">
//                 <Item
//                   to="/profile"
//                   icon={<User size={16} />}
//                   label="My Profile"
//                 />
//                 <Item
//                   to="/orders"
//                   icon={<Package size={16} />}
//                   label="My Orders"
//                 />
//                 <Item
//                   to="/wishlist"
//                   icon={<Heart size={16} />}
//                   label="Wishlist"
//                 />
//                 <Item
//                   to="/addresses"
//                   icon={<Pin size={16} />}
//                   label="Saved Addresses"
//                 />

//                 <div className="border-t my-2" />

//                 <button
//                   onClick={onLogout}
//                   className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
//                   role="menuitem"
//                 >
//                   <LogOut size={18} />
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               // LOGGED OUT MENU
//               <div className="py-1">
//                 <Item to="/login" icon={<LogIn size={16} />} label="Login" />
//                 <Item
//                   to="/signup"
//                   icon={<UserPlus size={16} />}
//                   label="Create Account"
//                 />
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

///////////////////////////////////////////// Update 16-02-2026
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
    ? (user?.name?.[0]?.toUpperCase() ?? "U")
    : null;

  return (
    <div className="relative" ref={menuRef}>
      {/* TRIGGER: COMPACT & MINIMAL */}
      <motion.button
        ref={buttonRef}
        onClick={toggleOpen}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
        className="flex items-center gap-1.5 p-1 rounded-full hover:bg-zinc-100 transition-colors group select-none"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white ring-2 ring-offset-1 ring-transparent group-hover:ring-zinc-200 transition-all">
            {isLoggedIn ? (
              <span className="text-[11px] font-bold tracking-tight">
                {firstLetter}
              </span>
            ) : (
              <User size={14} strokeWidth={2.5} />
            )}
          </div>
          {isLoggedIn && (
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>

        <ChevronDown
          size={12}
          className={`text-zinc-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </motion.button>

      {/* DROPDOWN: TIGHT & DENSE */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-zinc-100 overflow-hidden z-100"
            role="menu"
          >
            {isLoggedIn ? (
              <div className="flex flex-col">
                {/* Minimalist Identity Header */}
                <div className="px-4 py-3 bg-zinc-50/50 border-b border-zinc-100">
                  <p className="text-[12px] font-bold text-zinc-900 truncate leading-none mb-1">
                    {user?.name}
                  </p>
                  <p className="text-[10px] text-zinc-500 truncate font-medium">
                    {user?.email}
                  </p>
                </div>

                {/* Items with reduced padding and smaller font */}
                <div className="p-1.5 space-y-0.5">
                  <Item
                    to="/profile"
                    icon={<User size={14} />}
                    label="Profile"
                  />
                  <Item
                    to="/orders"
                    icon={<Package size={14} />}
                    label="Orders"
                  />
                  <Item
                    to="/wishlist"
                    icon={<Heart size={14} />}
                    label="Wishlist"
                  />
                  <Item
                    to="/addresses"
                    icon={<Pin size={14} />}
                    label="Addresses"
                  />
                </div>

                <div className="border-t border-zinc-100 my-1" />

                <div className="p-1.5 pt-0">
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-colors group"
                  >
                    <LogOut
                      size={14}
                      className="group-hover:-translate-x-0.5 transition-transform"
                    />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-1.5 space-y-0.5">
                <div className="px-3 py-2 mb-1">
                  <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                    Welcome
                  </p>
                </div>
                <Item to="/login" icon={<LogIn size={14} />} label="Sign In" />
                <Item
                  to="/signup"
                  icon={<UserPlus size={14} />}
                  label="Join Store"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
