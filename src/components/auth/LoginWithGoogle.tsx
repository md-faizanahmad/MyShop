// // src/components/LoginWithGoogle.tsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { auth, googleProvider } from "../lib/firebase";
// import { signInWithRedirect, getRedirectResult } from "firebase/auth";
// import { motion } from "framer-motion";
// import { LogIn } from "lucide-react";

// interface LoginWithGoogleProps {
//   onError?: (error: string) => void;
// }

// const LoginWithGoogle: React.FC<LoginWithGoogleProps> = ({ onError }) => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Handle Google redirect result (runs only once!)
//   useEffect(() => {
//     (async () => {
//       try {
//         const result = await getRedirectResult(auth);
//         if (result) {
//           navigate("/profile");
//         }
//       } catch (error) {
//         const message =
//           error instanceof Error ? error.message : "Google login failed";
//         onError?.(message);
//       }
//     })();
//   }, [navigate, onError]);

//   const handleGoogleLogin = async () => {
//     setLoading(true);
//     try {
//       await signInWithRedirect(auth, googleProvider);
//     } catch (error) {
//       const message =
//         error instanceof Error ? error.message : "Google login failed";
//       onError?.(message);
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.button
//       onClick={handleGoogleLogin}
//       disabled={loading}
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       className={`flex items-center justify-center gap-2 w-full py-2 px-4 bg-white border border-blue-400 text-blue-600
//       hover:bg-blue-50 rounded-lg transition text-sm font-medium
//       ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//     >
//       <LogIn size={16} />
//       <span>{loading ? "Signing in..." : "Sign in with Google"}</span>
//     </motion.button>
//   );
// };

// export default LoginWithGoogle;
