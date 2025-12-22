// import axios from "axios";
// import type { PublicProduct } from "../../types/product";

// const API = import.meta.env.VITE_API_URL;

// export async function getWishlist(): Promise<PublicProduct[]> {
//   const { data } = await axios.get<{
//     success: boolean;
//     products: PublicProduct[];
//   }>(`${API}/api/wishlist`, { withCredentials: true });
//   return data.products ?? [];
// }

// export async function removeFromWishlist(id: string) {
//   await axios.delete(`${API}/api/wishlist/remove/${id}`, {
//     withCredentials: true,
//   });
// }
