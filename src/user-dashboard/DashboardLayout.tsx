import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  MapPin,
  LayoutDashboard,
  LogOut,
  Menu,
} from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Auth";

const API = import.meta.env.VITE_API_URL;

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  async function handleLogout() {
    await axios.post(`${API}/v1/users/logout`, {}, { withCredentials: true });
    await refreshUser();
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 shadow-md fixed inset-y-0 left-0 transform 
        ${open ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 lg:translate-x-0 z-50`}
      >
        <div className="px-6 py-4 text-xl font-bold border-b">My Account</div>

        <nav className="p-4 space-y-2">
          <DashboardLink
            to="/dashboard"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
          />
          <DashboardLink
            to="/dashboard/profile"
            icon={<User size={18} />}
            label="Profile"
          />
          <DashboardLink
            to="/dashboard/orders"
            icon={<Package size={18} />}
            label="My Orders"
          />
          <DashboardLink
            to="/dashboard/wishlist"
            icon={<Heart size={18} />}
            label="Wishlist"
          />
          <DashboardLink
            to="/dashboard/addresses"
            icon={<MapPin size={18} />}
            label="Addresses"
          />

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 w-full text-left rounded-lg hover:bg-red-50 text-red-600 mt-4"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden p-3 fixed top-30 left-4 bg-white rounded-full shadow"
      >
        <Menu size={20} />
      </button>

      {/* Click Outside Overlay (Mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 lg:hidden"
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
}

function DashboardLink({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition ${
          isActive ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700"
        }`
      }
    >
      {icon} {label}
    </NavLink>
  );
}
