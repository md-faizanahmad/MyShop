import axios, {
  type AxiosInstance,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "../store/useAuthStore";

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
  (error: AxiosError) => Promise.reject(error)
);

/* -----------------------------
   RESPONSE INTERCEPTOR
   ⚠️ DO NOT LOGOUT DURING BOOT
----------------------------- */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const auth = useAuthStore.getState();

      // 🚫 Ignore 401 while restoring session
      if (!auth.initializing) {
        auth._forceLogout();
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
