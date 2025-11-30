// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import type { JSX } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        Checking session…
      </div>
    );
  }

  if (!user?.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
