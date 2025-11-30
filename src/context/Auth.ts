// src/context/Auth.ts
import { createContext, useContext } from "react";

export interface AuthContextType {
  user: {
    isLoggedIn: boolean;
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
  } | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
});

export const useAuth = () => useContext(AuthContext);
