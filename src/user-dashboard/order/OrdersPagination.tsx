import { ChevronLeft, ChevronRight } from "lucide-react";

interface OrdersPaginationProps {
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export default function OrdersPagination({
  page,
  hasNextPage,
  hasPrevPage,
  onPreviousPage,
  onNextPage,
}: OrdersPaginationProps) {
  return (
    <nav
      aria-label="Orders pagination"
      className="mt-6 flex items-center justify-between gap-2 sm:mt-8 sm:gap-4"
    >
      <button
        type="button"
        disabled={!hasPrevPage}
        onClick={onPreviousPage}
        className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-10 sm:gap-1.5 sm:px-4 sm:text-sm"
      >
        <ChevronLeft size={15} className="sm:h-[17px] sm:w-[17px]" />
        <span>Previous</span>
      </button>

      <span
        aria-current="page"
        className="shrink-0 text-xs font-medium text-gray-500 sm:text-sm"
      >
        Page {page}
      </span>

      <button
        type="button"
        disabled={!hasNextPage}
        onClick={onNextPage}
        className="inline-flex min-h-9 items-center gap-1 rounded-lg bg-sky-500 px-3 text-xs font-medium text-white shadow-sm transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-10 sm:gap-1.5 sm:px-4 sm:text-sm"
      >
        <span>Next</span>
        <ChevronRight size={15} className="sm:h-[17px] sm:w-[17px]" />
      </button>
    </nav>
  );
}
