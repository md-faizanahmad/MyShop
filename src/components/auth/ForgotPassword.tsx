import { motion } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
}

/**
 * Placeholder Forgot Password modal — separate component and easy to replace later.
 */
export default function ForgotPassword({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-md w-full p-6 rounded-lg shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-2">Forgot password</h3>
        <p className="text-sm text-gray-600 mb-4">
          We’ll add the password recovery flow soon. For now, contact support at{" "}
          <a className="text-blue-600" href="mailto:support@myazstore.shop">
            support@myazstore.shop
          </a>
          .
        </p>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
