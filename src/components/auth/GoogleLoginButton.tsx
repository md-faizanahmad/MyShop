// GoogleLoginButton.tsx
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

interface CredentialResponse {
  credential: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: CredentialResponse) => void;
          }) => void;

          renderButton: (
            parent: HTMLElement | null,
            options: {
              theme: "outline" | "filled_blue" | "filled_black";
              size?: "small" | "medium" | "large";
              width?: number;
            }
          ) => void;
        };
      };
    };
  }
}

export default function GoogleLoginButton() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      {
        theme: "outline",
        size: "large",
        width: 300, // Must be number, no %
      }
    );
  }, []);

  async function handleGoogleResponse(response: CredentialResponse) {
    try {
      const { data } = await axios.post(
        `${API}/api/users/google-login`,
        { credential: response.credential },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Logged in with Google");
        navigate("/profile");
      }
    } catch (err) {
      toast.error("Google login failed");
      console.error(err);
    }
  }

  return (
    <div className="mt-3">
      <div id="googleBtn" className="flex justify-center"></div>
    </div>
  );
}
