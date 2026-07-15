import axios, {
  type AxiosInstance,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { useConnectionStore } from "../store/useConnectionStore";
const API_BASE = import.meta.env.VITE_API_URL as string;

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // 🔐 HttpOnly cookies MUST be sent
  headers: {
    "Content-Type": "application/json",
  },
});

/* -----------------------------
   REQUEST INTERCEPTOR
----------------------------- */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error),
);

/* -----------------------------
   RESPONSE INTERCEPTOR
   ⚠️ DO NOT LOGOUT DURING BOOT
----------------------------- */
// apiClient.interceptors.response.use(
//   (response) => response,

//   (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       const auth = useAuthStore.getState();

//       // 🚫 Ignore 401 while restoring session
//       if (!auth.initializing) {
//         auth._forceLogout();
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// change for api failure
apiClient.interceptors.response.use(
  (response) => {
    // API is reachable
    useConnectionStore.getState().setConnected(true);

    return response;
  },

  (error: AxiosError) => {
    const { setConnected } = useConnectionStore.getState();

    // Connection lost / API unreachable / Request timeout
    if (error.code === "ERR_NETWORK" || error.code === "ECONNABORTED") {
      setConnected(false);
    }

    // 🚫 Keep existing auth logic unchanged
    if (error.response?.status === 401) {
      const auth = useAuthStore.getState();

      // 🚫 Ignore 401 while restoring session
      if (!auth.initializing) {
        auth._forceLogout();
      }
    }

    return Promise.reject(error);
  },
);
export default apiClient;
