// src/components/user-menu/UserMenu.tsx
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuthStore } from "../../../store/useAuthStore";
import UserMenuView from "./UserMenuView";
import type { UserType } from "./usermenu-types";

export default function UserMenu() {
  const [open, setOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  // -----------------------------
  // Zustand selectors
  // -----------------------------
  const user = useAuthStore((s) => s.user);
  const status = useAuthStore((s) => s.status);
  const logout = useAuthStore((s) => s.logout);

  const isLoggedIn = status === "authenticated";

  // -----------------------------
  // Close menu on route change
  // -----------------------------
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // -----------------------------
  // Close when clicking outside
  // -----------------------------
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node | null;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  if (status === "loading") {
    return (
      <div className="w-8 h-8 me-4 flex items-center justify-center font-bold bg-gray-200 rounded-full animate-pulse" />
    );
  }
  const toggleOpen = () => setOpen((s) => !s);

  // -----------------------------
  // Logout handler
  // -----------------------------
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <UserMenuView
      open={open}
      toggleOpen={toggleOpen}
      buttonRef={buttonRef}
      menuRef={menuRef}
      isLoggedIn={isLoggedIn}
      user={user as UserType | null}
      onLogout={handleLogout}
    />
  );
}
