import { useState, useEffect } from "react";
import { Package, Heart, ShoppingCart } from "lucide-react";
import axios from "axios";
import StatCard from "./components/StatCard";

const API = import.meta.env.VITE_API_URL;

export default function DashboardHome() {
  const [stats, setStats] = useState({
    orders: 0,
    wishlist: 0,
    cart: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        await axios.get(`${API}/v1/users/me`, {
          withCredentials: true,
        });

        // Placeholder stats (will update after building orders/wishlist)
        setStats({
          orders: 0,
          wishlist: 0,
          cart: 0,
        });
      } catch {
        console.log("Failed to load stats");
      }
    }
    loadStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Orders"
          value={stats.orders}
          icon={<Package size={22} />}
        />
        <StatCard
          title="Wishlist"
          value={stats.wishlist}
          icon={<Heart size={22} />}
        />
        <StatCard
          title="Cart Items"
          value={stats.cart}
          icon={<ShoppingCart size={22} />}
        />
      </div>
    </div>
  );
}
