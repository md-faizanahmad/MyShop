import { ChevronDown, User, UserRound } from "lucide-react";
import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                                   Props                                    */
/* -------------------------------------------------------------------------- */

interface Props {
  // Controls whether the account menu is currently open.
  open: boolean;

  // Opens or closes the account menu.
  toggleOpen: () => void;

  // Ref attached to the account trigger button.
  buttonRef: React.RefObject<HTMLButtonElement | null>;

  // Determines whether the user is logged in.
  isLoggedIn: boolean;

  // First letter of the logged-in user's name.
  firstLetter: string | null;

  // Used to respect the user's reduced-motion preference.
  shouldReduceMotion: boolean | null;
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export default function UserMenuTrigger({
  open,
  toggleOpen,
  buttonRef,
  isLoggedIn,
  firstLetter,
  shouldReduceMotion,
}: Props) {
  return (
    <motion.button
      /*
       * Ref stays attached to the actual trigger button.
       * UserMenuView owns this ref.
       */
      ref={buttonRef}
      type="button"
      onClick={toggleOpen}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
      aria-expanded={open}
      aria-haspopup="menu"
      aria-label={isLoggedIn ? "Open account menu" : "Open account options"}
      className="
        group
        flex
        min-w-0
        flex-1
        flex-col
        items-center
        justify-center
        gap-1
        py-2
        text-[11px]
        font-medium
        text-black
        transition-colors

        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-neutral-300/70
        focus-visible:ring-offset-1

        md:flex-none
        md:flex-row
        md:gap-1.5
        
        md:p-1
        cursor-pointer
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Mobile Account Icon                                                */}
      {/* ------------------------------------------------------------------ */}

      {/*
       * Logged-in users get their branded initial.
       *
       * Guest users get the neutral account icon.
       *
       * Red is NOT used for the closed/open state here.
       */}
      {isLoggedIn ? (
        <span
          className="
            flex
            h-[21px]
            w-[21px]
            items-center
            justify-center
            rounded-full
            bg-linear-to-br
            from-sky-600
            to-red-600
            text-[9px]
            font-bold
            text-white
            shadow-sm
            md:hidden
          "
        >
          {firstLetter}
        </span>
      ) : (
        <UserRound
          size={21}
          strokeWidth={open ? 1.9 : 1.7}
          aria-hidden="true"
          className="
            transition-colors
            md:hidden
          "
        />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Mobile Account Label                                               */}
      {/* ------------------------------------------------------------------ */}

      {/*
       * Keep the label neutral.
       *
       * The account button does not need to become red simply because
       * its dropdown is open.
       */}
      <span
        className="
          text-[11px]
          text-neutral-500
          transition-colors
          group-hover:text-neutral-700
          md:hidden
        "
      >
        Account
      </span>

      {/* ------------------------------------------------------------------ */}
      {/* Desktop Avatar                                                     */}
      {/* ------------------------------------------------------------------ */}

      <div className="relative hidden md:block">
        <div
          className="
          cursor-pointer
            flex
            h-8
            w-8
            items-center
            justify-center
            ring-2
            ring-transparent
            transition-all
s          "
        >
          {/*
           * Logged-in:
           * user's first initial.
           *
           * Guest:
           * neutral account icon.
           */}
          {isLoggedIn ? (
            <span className="text-[11px] font-bold tracking-tight">
              {firstLetter}
            </span>
          ) : (
            <User size={15} strokeWidth={2.1} aria-hidden="true" />
          )}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Logged-in Status Indicator                                       */}
        {/* ---------------------------------------------------------------- */}

        {/*
         * The green dot is intentionally retained.
         * It communicates account state without adding another red element.
         */}
        {isLoggedIn && (
          <span
            className="
              absolute
              -bottom-0.5
              -right-0.5
              h-2.5
              w-2.5
              rounded-full
              border-2
              border-white
              bg-emerald-500
            "
            aria-hidden="true"
          />
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Desktop Chevron                                                    */}
      {/* ------------------------------------------------------------------ */}

      {/*
       * Chevron remains neutral.
       *
       * Its rotation is enough to communicate the open state.
       */}
      <ChevronDown
        size={12}
        aria-hidden="true"
        className={`
          hidden
          text-zinc-400
          transition-transform
          duration-200
          md:block
          ${open ? "rotate-180 text-zinc-500" : ""}
        `}
      />
    </motion.button>
  );
}
