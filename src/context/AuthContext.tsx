// import { useState, useEffect } from "react";
// import axios from "axios";
// import { AuthContext } from "./Auth";
// import type { ReactNode } from "react";

// const API = import.meta.env.VITE_API_URL;

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<{
//     isLoggedIn: boolean;
//     id?: string;
//     name?: string;
//     email?: string;
//     phone?: string;
//   } | null>(null);

//   const [loading, setLoading] = useState(true);

//   // Fetch /me to load authenticated user
//   const refreshUser = async () => {
//     try {
//       const { data } = await axios.get(`${API}/api/users/me`, {
//         withCredentials: true,
//       });

//       if (data.success) {
//         setUser({
//           isLoggedIn: true,
//           id: data.user.id,
//           name: data.user.name,
//           email: data.user.email,
//           phone: data.user.phone,
//         });
//       } else {
//         setUser({ isLoggedIn: false });
//       }
//     } catch {
//       setUser({ isLoggedIn: false });
//     }
//   };

//   useEffect(() => {
//     refreshUser().finally(() => setLoading(false));
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading, refreshUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
//////////////////////////////////// New Updated
import { useState, useEffect, type ReactNode } from "react";
import axios from "axios";
import { AuthContext } from "./Auth";

const API = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{
    isLoggedIn: boolean;
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  /** Load /me user session */
  const refreshUser = async () => {
    try {
      const { data } = await axios.get(`${API}/api/users/me`, {
        withCredentials: true,
      });

      if (data.success) {
        setUser({
          isLoggedIn: true,
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
        });
      } else {
        setUser({ isLoggedIn: false });
      }
    } catch {
      setUser({ isLoggedIn: false });
    }
  };

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
