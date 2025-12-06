// src/components/Profile.tsx
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, User, MapPin, Heart, Package, LogOut } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../context/Auth";

const API = import.meta.env.VITE_API_URL;

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isLoggedIn) navigate("/login");
  }, [user, navigate]);

  async function handleLogout() {
    await axios.post(`${API}/v1/users/logout`, {}, { withCredentials: true });
    await refreshUser();
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-700 mb-4 hover:text-black"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto bg-white rounded-xl shadow p-6"
      >
        {/* Top Section */}
        <div className="flex items-center gap-4 pb-4 border-b">
          <div className="w-14 h-14 bg-blue-100 text-blue-700 flex items-center justify-center rounded-full text-xl font-bold uppercase">
            {user?.name?.[0] ?? "U"}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-gray-600 text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Dashboard Menu */}
        <div className="mt-6 space-y-3">
          <Link
            to="/profile/details"
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
          >
            <User size={20} />
            <span className="text-gray-800 font-medium">Account Details</span>
          </Link>

          <Link
            to="/orders"
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
          >
            <Package size={20} />
            <span className="text-gray-800 font-medium">My Orders</span>
          </Link>

          <Link
            to="/wishlist"
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
          >
            <Heart size={20} />
            <span className="text-gray-800 font-medium">My Wishlist</span>
          </Link>

          <Link
            to="/addresses"
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
          >
            <MapPin size={20} />
            <span className="text-gray-800 font-medium">Saved Addresses</span>
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </motion.div>
    </div>
  );
}
