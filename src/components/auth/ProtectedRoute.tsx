// src/components/auth/ProtectedRoute.tsx
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import LoadingScreen from "../LoadingScreen";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const status = useAuthStore((s) => s.status);

  if (status === "idle" || status === "loading") {
    return <LoadingScreen />;
  }

  if (status !== "authenticated") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
