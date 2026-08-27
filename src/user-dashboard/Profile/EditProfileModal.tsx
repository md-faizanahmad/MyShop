// import axios from "axios";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import EditableField from "./EditableField";
// import OtpVerifyModal from "./OtpVerifyModal";
// import { useAuthStore } from "../../store/useAuthStore";

// const API = import.meta.env.VITE_API_URL as string;

// interface Props {
//   user: { name?: string; email?: string; phone?: string };
//   onClose: () => void;
// }

// export default function ProfileEditModal({ user, onClose }: Props) {
//   const [name, setName] = useState(user.name ?? "");
//   const [email, setEmail] = useState(user.email ?? "");
//   const [phone, setPhone] = useState(user.phone ?? "");

//   const [saving, setSaving] = useState(false);
//   const [otpOpen, setOtpOpen] = useState(false);
//   const [otpTarget, setOtpTarget] = useState<"email" | "phone" | null>(null);

//   const nameChanged = name !== user.name;
//   const emailChanged = email !== user.email;
//   const phoneChanged = phone !== user.phone;

//   const changedCount = [nameChanged, emailChanged, phoneChanged].filter(
//     Boolean,
//   ).length;

//   // adding to immedity update profile details
//   const restoreSession = useAuthStore((s) => s.restoreSession);

//   /* =====================
//      SAVE HANDLERS
//   ===================== */

//   async function saveName() {
//     setSaving(true);
//     await axios.patch(
//       `${API}/v1/users/me`,
//       { name },
//       { withCredentials: true },
//     );

//     // new added for update it after edit profile
//     restoreSession();
//     toast.success("Name updated");
//     setSaving(false);
//   }

//   async function requestOtp(type: "email" | "phone") {
//     setSaving(true);
//     await axios.post(
//       `${API}/v1/users/me/contact/request-otp`,
//       type === "email" ? { email } : { phone },
//       { withCredentials: true },
//     );
//     setOtpTarget(type);
//     setOtpOpen(true);
//     setSaving(false);
//   }

//   async function verifyOtp(otp: string) {
//     if (!otpTarget) return;

//     try {
//       // Decide purpose based on what is being updated
//       const purpose = otpTarget === "phone" ? "phone_change" : "email_change";

//       // 1️⃣ Verify OTP (OTP was sent to CURRENT email)
//       await axios.post(`${API}/v1/users/verify-otp`, {
//         email: user.email, // current registered email
//         otp,
//         purpose,
//       });
//       console.log("API URL =", API);

//       // 2️⃣ Apply the pending change (email OR phone)
//       await axios.post(
//         `${API}/v1/users/me/contact/confirm`,

//         { purpose },
//         { withCredentials: true },
//       );

//       // new added for update it after edit profile
//       restoreSession();

//       toast.success("Profile updated");
//       setOtpOpen(false);
//       onClose();
//     } catch {
//       toast.error("Invalid or expired OTP");
//     }
//   }

//   async function saveAll() {
//     if (nameChanged) await saveName();
//     if (emailChanged) await requestOtp("email");
//     if (phoneChanged) await requestOtp("phone");
//   }

//   return (
//     <>
//       {/* Clean overlay - no blur */}
//       <div className="fixed inset-0 bg-black/40 z-20" onClick={onClose} />

//       {/* Modal */}
//       <div className="fixed inset-0 z-25 flex items-center justify-center p-4 mt-10">
//         <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
//           {/* Header */}
//           <div className="px-8 pt-8 pb-6 border-b border-gray-200">
//             <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
//             <p className="mt-2 text-gray-600">
//               Make changes to your personal information
//             </p>
//           </div>

//           {/* Body - Fields */}
//           <div className="p-8 space-y-8">
//             <EditableField
//               label="Name"
//               value={name}
//               changed={nameChanged}
//               saving={saving}
//               onChange={setName}
//               onSave={saveName}
//               showButton={changedCount === 1}
//             />

//             <EditableField
//               label="Email"
//               value={email}
//               changed={emailChanged}
//               saving={saving}
//               onChange={setEmail}
//               onSave={() => requestOtp("email")}
//               showButton={changedCount === 1}
//             />

//             <EditableField
//               label="Phone"
//               value={phone}
//               changed={phoneChanged}
//               saving={saving}
//               onChange={setPhone}
//               onSave={() => requestOtp("phone")}
//               showButton={changedCount === 1}
//             />

//             {/* Save All Button - Multiple Changes */}
//             {changedCount > 1 && (
//               <button
//                 onClick={saveAll}
//                 disabled={saving}
//                 className="w-full py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
//               >
//                 {saving ? "Saving Changes..." : "Save All Changes"}
//               </button>
//             )}
//           </div>

//           {/* Footer */}
//           <div className="px-8 pb-8">
//             <button
//               onClick={onClose}
//               className="w-full py-3  text-gray-600 font-medium hover:text-gray-900 transition-colors"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>

//       <OtpVerifyModal
//         open={otpOpen}
//         onVerify={verifyOtp}
//         onClose={() => setOtpOpen(false)}
//       />
//     </>
//   );
// }
////////////////////// Refactor and update 27-08
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import EditableField from "./EditableField";
import OtpVerifyModal from "./OtpVerifyModal";
import { useAuthStore } from "../../store/useAuthStore";
import { X, UserRound, ShieldCheck } from "lucide-react";

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
    Boolean,
  ).length;

  // adding to immedity update profile details
  const restoreSession = useAuthStore((s) => s.restoreSession);

  /* =====================
     SAVE HANDLERS
  ===================== */

  async function saveName() {
    setSaving(true);
    await axios.patch(
      `${API}/v1/users/me`,
      { name },
      { withCredentials: true },
    );

    // new added for update it after edit profile
    restoreSession();
    toast.success("Name updated");
    setSaving(false);
  }

  async function requestOtp(type: "email" | "phone") {
    setSaving(true);
    await axios.post(
      `${API}/v1/users/me/contact/request-otp`,
      type === "email" ? { email } : { phone },
      { withCredentials: true },
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

      // 1️ Verify OTP (OTP was sent to CURRENT email)
      await axios.post(`${API}/v1/users/verify-otp`, {
        email: user.email,
        otp,
        purpose,
      });
      console.log("API URL =", API);

      // 2️ Apply the pending change (email OR phone)
      await axios.post(
        `${API}/v1/users/me/contact/confirm`,
        { purpose },
        { withCredentials: true },
      );

      // new added for update it after edit profile
      restoreSession();

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
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/45" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 sm:p-5">
        <div
          className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-zinc-100 px-5 py-4 sm:px-6 sm:py-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <UserRound size={19} />
              </div>

              <div className="min-w-0">
                <h2 className="text-base font-semibold text-zinc-900 sm:text-lg">
                  Edit Profile
                </h2>
                <p className="mt-0.5 text-xs text-zinc-500">
                  Update your personal information
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
            >
              <X size={18} />
            </button>
          </div>

          {/* Security Notice */}
          <div className="mx-5 mt-4 flex items-start gap-2.5 rounded-lg border border-sky-100 bg-sky-50/60 px-3 py-2.5 sm:mx-6">
            <ShieldCheck size={16} className="mt-0.5 shrink-0 text-sky-600" />

            <p className="text-xs leading-relaxed text-sky-800">
              Changing your email or phone number may require OTP verification.
            </p>
          </div>

          {/* Body */}
          <div className="space-y-6 px-5 py-5 sm:px-6 sm:py-6">
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

            {/* Multiple Changes */}
            {changedCount > 1 && (
              <button
                type="button"
                onClick={saveAll}
                disabled={saving}
                className="w-full rounded-lg bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving changes..." : "Save all changes"}
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-zinc-100 px-5 py-3 sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-800"
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
