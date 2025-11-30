import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  title?: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function NotFoundBlock({
  title = "Not Found",
  message = "We couldn't find what you were looking for.",
  actionLabel = "Go Home",
  actionHref = "/",
}: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="p-6 bg-white rounded-3xl shadow-lg border border-gray-200 max-w-md">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-14 h-14 text-red-500" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>

        <p className="text-gray-600 mb-6">{message}</p>

        <Link
          to={actionHref}
          className="inline-block px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          {actionLabel}
        </Link>
      </div>
    </div>
  );
}
