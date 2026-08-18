import { LogOut } from "lucide-react";
import { motion } from "framer-motion";

import type { UserType } from "./usermenu-types";
import type { MenuItem } from "./UserMenuView";
import Item from "./Item";

/* -------------------------------------------------------------------------- */
/*                                   Props                                    */
/* -------------------------------------------------------------------------- */

interface Props {
  // Closes the account menu.
  toggleOpen: () => void;

  // Determines which version of the menu should be displayed.
  isLoggedIn: boolean;

  // Current user's information.
  // Used to display the user's name when logged in.
  user: UserType | null;

  // Handles the logout action.
  onLogout: () => Promise<void> | void;

  // Menu items available to authenticated users.
  accountMenuItems: MenuItem[];

  // Menu items available to guests.
  guestMenuItems: MenuItem[];

  // Controls whether dropdown animations should be reduced.
  shouldReduceMotion: boolean | null;
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export default function UserMenuDropdown({
  toggleOpen,
  isLoggedIn,
  user,
  onLogout,
  accountMenuItems,
  guestMenuItems,
  shouldReduceMotion,
}: Props) {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Mobile Backdrop                                                    */}
      {/* ------------------------------------------------------------------ */}

      {/*
       * The backdrop exists only on mobile.
       *
       * It separates the account menu from the rest of the page and allows
       * the user to close the menu by tapping outside it.
       */}
      <motion.button
        type="button"
        aria-label="Close account menu"
        onClick={toggleOpen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.15,
        }}
        className="
          fixed
          inset-0
          z-40
          cursor-default
          border-0
          bg-black/15
          backdrop-blur-[1px]
          md:hidden
        "
      />

      {/* ------------------------------------------------------------------ */}
      {/* Account Dropdown                                                   */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        /*
         * role="menu" tells assistive technology that this is an interactive
         * menu containing account actions.
         */
        role="menu"
        aria-label="Account menu"
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : {
                opacity: 0,
                y: 8,
                scale: 0.98,
              }
        }
        animate={
          shouldReduceMotion
            ? { opacity: 1 }
            : {
                opacity: 1,
                y: 0,
                scale: 1,
              }
        }
        exit={
          shouldReduceMotion
            ? { opacity: 0 }
            : {
                opacity: 0,
                y: 8,
                scale: 0.98,
              }
        }
        transition={{
          duration: shouldReduceMotion ? 0 : 0.15,
          ease: "easeOut",
        }}
        className="
  fixed
  bottom-[calc(4rem+env(safe-area-inset-bottom)+0.5rem)]
  right-3
  z-50
  w-[min(210px,calc(100vw-1.5rem))]
  overflow-hidden
  rounded-[5px]
  border
  border-neutral-200/80
  bg-white
  text-[12px]
  shadow-[0_10px_30px_rgba(0,0,0,0.12)]

  md:absolute
  md:bottom-auto
  md:right-0
  md:top-full
  
  md:w-[170px]
  md:rounded-[5px]
  md:text-[12px]
  md:shadow-[0_8px_24px_rgba(0,0,0,0.10)]
"
      >
        {isLoggedIn ? (
          <div className="flex flex-col">
            {/* ------------------------------------------------------------ */}
            {/* Logged-in Identity                                           */}
            {/* ------------------------------------------------------------ */}

            {/*
             * Shows the current user's name at the top of the account menu.
             *
             * Kept intentionally compact so the dropdown feels like a
             * shopping-site account menu rather than a dashboard card.
             */}
            <div
              className="
                border-b
                border-neutral-100
                bg-neutral-50/70
                px-4
                py-2.5
              "
            >
              <p
                className="
                  truncate
                  text-[12px]
                  font-semibold
                  leading-4
                  text-neutral-900
                "
              >
                {user?.name || "Account"}
              </p>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* Account Links                                                */}
            {/* ------------------------------------------------------------ */}

            {/*
             * Existing Item component is responsible for rendering each
             * individual account navigation item.
             *
             * No separate component is needed here.
             */}
            <div className="space-y-0 p-1">
              {accountMenuItems.map((item) => (
                <Item
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                />
              ))}
            </div>

            {/* ------------------------------------------------------------ */}
            {/* Logout                                                       */}
            {/* ------------------------------------------------------------ */}

            {/*
             * Logout is separated from navigation using a top border.
             *
             * Red is reserved here because logout is a destructive action.
             */}
            <div className="border-t border-neutral-100 p-1.5">
              <button
                type="button"
                onClick={onLogout}
                role="menuitem"
                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-2.5
                  rounded-lg
                  px-3
                  py-2
                  text-left
                  text-[12px]
                  font-semibold
                  text-red-500
                  transition-colors
                  hover:bg-red-50
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-red-500/20
                "
              >
                <LogOut
                  size={15}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="
                    transition-transform
                    group-hover:-translate-x-0.5
                  "
                />

                <span>Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* ------------------------------------------------------------ */}
            {/* Guest Heading                                                */}
            {/* ------------------------------------------------------------ */}

            {/*
             * Small heading for unauthenticated users.
             *
             * It provides context without taking unnecessary vertical space.
             */}
            <div
              className="
                border-b
                border-neutral-100
                bg-neutral-50/70
                px-4
                py-2.5
              "
            >
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-neutral-400
                "
              >
                Welcome
              </p>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* Guest Links                                                  */}
            {/* ------------------------------------------------------------ */}

            {/*
             * Renders Sign In and New User using the existing Item component.
             */}
            <div className="space-y-0.5 p-1.5">
              {guestMenuItems.map((item) => (
                <Item
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
