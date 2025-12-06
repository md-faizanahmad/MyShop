import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL;

export default function ProductsByCategory() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${API}/v1/products?category=${category}`
        );
        setProducts(data.products || []);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {category} Products
      </h1>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 h-40 rounded-lg"
            ></div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-600 text-center">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product: any) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white shadow rounded-lg p-3 border cursor-pointer hover:shadow-md transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="font-semibold mt-2 text-sm">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-1">
                ₹{product.price.toLocaleString()}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
