// // src/hooks/useAuthCheck.ts
// import { useEffect } from "react";
// import axios from "axios";
// import { useAuthStore } from "../store/useAuthStore";

// const API = import.meta.env.VITE_API_URL;

// export function useAuthCheck() {
//   const { isLoggedIn, login } = useAuthStore();

//   useEffect(() => {
//     if (!isLoggedIn) {
//       // Try to fetch current user
//       axios
//         .get(`${API}/api/users/me`, { withCredentials: true })
//         .then((res) => {
//           if (res.data.success) {
//             login(res.data.user, res.data.token || "");
//           }
//         })
//         .catch(() => {
//           // Silent fail — user not logged in
//         });
//     }
//   }, []);
// }
