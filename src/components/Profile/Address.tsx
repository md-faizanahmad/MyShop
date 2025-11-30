import { useState } from "react";
import { motion } from "framer-motion";

export default function Addresses() {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [newAddress, setNewAddress] = useState("");

  function addAddress() {
    if (!newAddress.trim()) return;
    setAddresses([...addresses, newAddress.trim()]);
    setNewAddress("");
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">My Addresses</h2>

      <div className="space-y-4">
        {addresses.map((addr, i) => (
          <div key={i} className="bg-gray-100 p-3 rounded border text-gray-700">
            {addr}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <textarea
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          className="w-full p-3 border rounded-lg"
          placeholder="Add new address…"
        ></textarea>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={addAddress}
          className="w-full mt-3 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Add Address
        </motion.button>
      </div>
    </div>
  );
}
