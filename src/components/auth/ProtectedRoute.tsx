// src/components/ProtectedRoute.tsx
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";

// Optional: Simple loading spinner
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, loading } = useAuth();

  // Show loader while checking session
  if (loading) {
    return <LoadingScreen />;
  }

  // Redirect to login if not authenticated
  if (!user?.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
