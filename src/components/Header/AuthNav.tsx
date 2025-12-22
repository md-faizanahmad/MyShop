import type { FC } from "react";
import clsx from "clsx";

interface AuthNavProps {
  loginHref?: string;
  signupHref?: string;
  className?: string;
  /** show links on small screens as well */
  showOnMobile?: boolean;
}

const AuthNav: FC<AuthNavProps> = ({
  loginHref = "/login",
  signupHref = "/signup",
  className = "",
  showOnMobile = false,
}) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-4",
        showOnMobile ? "block md:flex" : "hidden md:flex",
        className
      )}
      aria-label="Authentication links"
    >
      <a
        href={loginHref}
        className="px-2 py-1 text-sm font-medium hover:text-yellow-300 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
        title="Login"
        aria-label="Login"
      >
        Login
      </a>

      <a
        href={signupHref}
        className="px-3 py-1 text-sm font-semibold rounded-md bg-transparent border border-green-400 text-green-400 hover:bg-green-400/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
        title="Sign up"
        aria-label="Sign up"
      >
        Sign Up
      </a>
    </div>
  );
};

export default AuthNav;
