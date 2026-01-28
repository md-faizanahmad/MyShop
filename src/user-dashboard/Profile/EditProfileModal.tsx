import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import EditableField from "./EditableField";
import OtpVerifyModal from "./OtpVerifyModal";

const API = import.meta.env.VITE_API_URL as string;

interface Props {
  user: { name?: string; email?: string; phone?: string };
  onClose: () => void;
}

export default function ProfileEditModal({ user, onClose }: Props) {
  const [name, setName] = useState(user.name ?? "");
  const [email, setEmail] = useState(user.email ?? "");
  const [phone, setPhone] = useState(user.phone ?? "");

  const [saving, setSaving] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpTarget, setOtpTarget] = useState<"email" | "phone" | null>(null);

  const nameChanged = name !== user.name;
  const emailChanged = email !== user.email;
  const phoneChanged = phone !== user.phone;

  const changedCount = [nameChanged, emailChanged, phoneChanged].filter(
    Boolean
  ).length;

  /* =====================
     SAVE HANDLERS
  ===================== */

  async function saveName() {
    setSaving(true);
    await axios.patch(
      `${API}/v1/users/me`,
      { name },
      { withCredentials: true }
    );
    toast.success("Name updated");
    setSaving(false);
  }

  async function requestOtp(type: "email" | "phone") {
    setSaving(true);
    await axios.post(
      `${API}/v1/users/me/contact/request-otp`,
      type === "email" ? { email } : { phone },
      { withCredentials: true }
    );
    setOtpTarget(type);
    setOtpOpen(true);
    setSaving(false);
  }

  async function verifyOtp(otp: string) {
    if (!otpTarget) return;

    try {
      // Decide purpose based on what is being updated
      const purpose = otpTarget === "phone" ? "phone_change" : "email_change";

      // 1️⃣ Verify OTP (OTP was sent to CURRENT email)
      await axios.post(`${API}/v1/users/verify-otp`, {
        email: user.email, // current registered email
        otp,
        purpose,
      });
      console.log("API URL =", API);

      // 2️⃣ Apply the pending change (email OR phone)
      await axios.post(
        `${API}/v1/users/me/contact/confirm`,
        { purpose },
        { withCredentials: true }
      );

      toast.success("Profile updated");
      setOtpOpen(false);
      onClose();
    } catch {
      toast.error("Invalid or expired OTP");
    }
  }

  async function saveAll() {
    if (nameChanged) await saveName();
    if (emailChanged) await requestOtp("email");
    if (phoneChanged) await requestOtp("phone");
  }

  return (
    <>
      {/* Clean overlay - no blur */}
      <div className="fixed inset-0 bg-black/40 z-20" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-25 flex items-center justify-center p-4 mt-10">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
            <p className="mt-2 text-gray-600">
              Make changes to your personal information
            </p>
          </div>

          {/* Body - Fields */}
          <div className="p-8 space-y-8">
            <EditableField
              label="Name"
              value={name}
              changed={nameChanged}
              saving={saving}
              onChange={setName}
              onSave={saveName}
              showButton={changedCount === 1}
            />

            <EditableField
              label="Email"
              value={email}
              changed={emailChanged}
              saving={saving}
              onChange={setEmail}
              onSave={() => requestOtp("email")}
              showButton={changedCount === 1}
            />

            <EditableField
              label="Phone"
              value={phone}
              changed={phoneChanged}
              saving={saving}
              onChange={setPhone}
              onSave={() => requestOtp("phone")}
              showButton={changedCount === 1}
            />

            {/* Save All Button - Multiple Changes */}
            {changedCount > 1 && (
              <button
                onClick={saveAll}
                disabled={saving}
                className="w-full py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {saving ? "Saving Changes..." : "Save All Changes"}
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 pb-8">
            <button
              onClick={onClose}
              className="w-full py-3  text-gray-600 font-medium hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <OtpVerifyModal
        open={otpOpen}
        onVerify={verifyOtp}
        onClose={() => setOtpOpen(false)}
      />
    </>
  );
}
