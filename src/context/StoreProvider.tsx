// // src/context/StoreProvider.tsx
// import { useState, useEffect, type ReactNode } from "react";
// import axios from "axios";
// import { StoreContext, type StoreContextType } from "./StoreContext";

// const API = import.meta.env.VITE_API_URL;

// export function StoreProvider({ children }: { children: ReactNode }) {
//   const [cartCount, setCartCount] = useState<number>(0);
//   const [wishlistIds, setWishlistIds] = useState<string[]>([]);

//   const wishlistCount = wishlistIds.length;

//   async function refreshStore() {
//     try {
//       const wishlistRes = await axios.get<{
//         success: boolean;
//         products: { _id: string }[];
//       }>(`${API}/api/wishlist`, { withCredentials: true });

//       if (wishlistRes.data.success) {
//         setWishlistIds(wishlistRes.data.products.map((p) => p._id));
//       } else {
//         setWishlistIds([]);
//       }
//     } catch {
//       setWishlistIds([]);
//     }

//     try {
//       const cartRes = await axios.get<{
//         success: boolean;
//         items: { product: string; qty: number }[];
//       }>(`${API}/api/cart`, { withCredentials: true });

//       if (cartRes.data.success) {
//         const total = cartRes.data.items.reduce(
//           (acc, item) => acc + (item.qty || 0),
//           0
//         );
//         setCartCount(total);
//       } else {
//         setCartCount(0);
//       }
//     } catch {
//       setCartCount(0);
//     }
//   }

//   useEffect(() => {
//     void refreshStore();
//   }, []);

//   async function addToWishlist(productId: string) {
//     await axios.post(
//       `${API}/api/wishlist/add/${productId}`,
//       {},
//       { withCredentials: true }
//     );
//     setWishlistIds((prev) =>
//       prev.includes(productId) ? prev : [...prev, productId]
//     );
//   }

//   async function removeFromWishlist(productId: string) {
//     await axios.delete(`${API}/api/wishlist/remove/${productId}`, {
//       withCredentials: true,
//     });
//     setWishlistIds((prev) => prev.filter((id) => id !== productId));
//   }

//   async function addToCart(productId: string, qty = 1) {
//     await axios.post(
//       `${API}/api/cart/add`,
//       { productId, qty },
//       { withCredentials: true }
//     );
//     setCartCount((prev) => prev + qty);
//   }

//   const value: StoreContextType = {
//     cartCount,
//     wishlistCount,
//     wishlistIds,
//     refreshStore,
//     addToWishlist,
//     removeFromWishlist,
//     addToCart,
//   };

//   return (
//     <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
//   );
// }
/////////////////////////////////////// New Updated
import { useState, useEffect, type ReactNode } from "react";
import axios from "axios";
import { StoreContext } from "./StoreContext";

const API = import.meta.env.VITE_API_URL;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  const wishlistCount = wishlistIds.length;

  /** Refresh store data */
  async function refreshStore() {
    // Wishlist
    try {
      const res = await axios.get(`${API}/api/wishlist`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setWishlistIds(res.data.products.map((p: { _id: string }) => p._id));
      } else {
        setWishlistIds([]);
      }
    } catch {
      setWishlistIds([]);
    }

    // Cart
    try {
      const res = await axios.get(`${API}/api/cart`, {
        withCredentials: true,
      });

      if (res.data.success) {
        const total = res.data.items.reduce(
          (acc: number, item: { qty: number }) => acc + (item.qty || 0),
          0
        );
        setCartCount(total);
      } else {
        setCartCount(0);
      }
    } catch {
      setCartCount(0);
    }
  }

  useEffect(() => {
    void refreshStore();
  }, []);

  /** Wishlist Actions */
  async function addToWishlist(productId: string) {
    await axios.post(
      `${API}/api/wishlist/add/${productId}`,
      {},
      { withCredentials: true }
    );
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev : [...prev, productId]
    );
  }

  async function removeFromWishlist(productId: string) {
    await axios.delete(`${API}/api/wishlist/remove/${productId}`, {
      withCredentials: true,
    });
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  }

  /** Cart Action */
  async function addToCart(productId: string, qty = 1) {
    await axios.post(
      `${API}/api/cart/add`,
      { productId, qty },
      { withCredentials: true }
    );
    setCartCount((prev) => prev + qty);
  }

  return (
    <StoreContext.Provider
      value={{
        cartCount,
        wishlistCount,
        wishlistIds,
        refreshStore,
        addToWishlist,
        removeFromWishlist,
        addToCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
