import type { JSX } from "react";
import { Loader2 } from "lucide-react";

export default function CartLoading(): JSX.Element {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 text-neutral-500">
      <div className="flex flex-col items-center gap-3">
        <Loader2
          size={30}
          strokeWidth={2}
          className="animate-spin text-sky-600"
          aria-hidden="true"
        />

        <span className="text-xs font-medium sm:text-sm">Loading cart…</span>
      </div>
    </div>
  );
}
