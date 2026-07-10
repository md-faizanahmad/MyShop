import { Link } from "react-router-dom";

export default function LoginFooter() {
  return (
    <div className="mt-6 border-t border-neutral-100 pt-4 text-center dark:border-neutral-800">
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        New User?{" "}
        <Link
          to="/signup"
          className="font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600 dark:text-neutral-50 dark:hover:text-neutral-300 transition-colors"
        >
          Create account
        </Link>
      </p>
    </div>
  );
}
