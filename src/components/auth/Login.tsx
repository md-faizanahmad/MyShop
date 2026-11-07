// // src/pages/auth/Login.tsx
// import { useState, type FormEvent, type ChangeEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import LoginForm from "./LoginForm";
// import { useAuthStore } from "@/store/useAuthStore";

// export default function Login() {
//   const navigate = useNavigate();

//   // Zustand actions
//   const loginWithPassword = useAuthStore((s) => s.loginWithPassword);

//   // UI state
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // LOGIN WITH PASSWORD
//   const handlePasswordLogin = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!email || !password) return;

//     setLoading(true);
//     setError("");

//     try {
//       await loginWithPassword({ email, password });
//       toast.success("Logged in successfully");
//       navigate("/", { replace: true });
//     } catch {
//       setError("Invalid email or password");
//       toast.error("Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Input handlers
//   const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
//     setEmail(e.target.value);

//   const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
//     setPassword(e.target.value);

//   return (
//     <LoginForm
//       email={email}
//       password={password}
//       showPassword={showPassword}
//       loading={loading}
//       error={error}
//       onEmailChange={handleEmailChange}
//       onPasswordChange={handlePasswordChange}
//       onSubmitPassword={handlePasswordLogin}
//       toggleShowPassword={() => setShowPassword((prev) => !prev)}
//     />
//   );
// }

/////////// Refactor and Improve Instead of Using too Many States , Single Center State

import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginForm from "./LoginForm";
import { useAuthStore } from "@/store/useAuthStore";

export default function Login() {
  const navigate = useNavigate();
  const loginWithPassword = useAuthStore((state) => state.loginWithPassword);

  const [state, setState] = useState({
    email: "",
    password: "",
    showPassword: false,
    loading: false,
    error: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleShowPassword = () => {
    setState((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  const handlePasswordLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = state.email.trim();
    const password = state.password;

    if (!email || !password || state.loading) return;

    setState((prev) => ({
      ...prev,
      loading: true,
      error: "",
    }));

    try {
      await loginWithPassword({ email, password });

      toast.success("Logged in successfully");
      navigate("/", { replace: true });
    } catch {
      setState((prev) => ({
        ...prev,
        error: "Invalid email or password",
      }));

      toast.error("Invalid email or password");
    } finally {
      setState((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  return (
    <LoginForm
      email={state.email}
      password={state.password}
      showPassword={state.showPassword}
      loading={state.loading}
      error={state.error}
      onInputChange={handleInputChange}
      onSubmitPassword={handlePasswordLogin}
      toggleShowPassword={toggleShowPassword}
    />
  );
}
