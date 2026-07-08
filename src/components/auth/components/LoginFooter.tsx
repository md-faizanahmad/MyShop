// src/features/auth/components/LoginFooter.tsx

import { Link } from "react-router-dom";

export default function LoginFooter() {
  return (
    <p className="mt-6 text-center text-sm text-gray-600">
      Don't have an account?{" "}
      <Link to="/signup" className="font-semibold text-sky-600 hover:underline">
        Sign up
      </Link>
    </p>
  );
}
