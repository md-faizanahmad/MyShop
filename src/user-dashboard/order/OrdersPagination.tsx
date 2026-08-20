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
      className="mt-8 flex items-center justify-between gap-4"
    >
      <button
        type="button"
        disabled={!hasPrevPage}
        onClick={onPreviousPage}
        className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={17} />
        <span>Previous</span>
      </button>

      <span aria-current="page" className="text-sm font-medium text-gray-500">
        Page {page}
      </span>

      <button
        type="button"
        disabled={!hasNextPage}
        onClick={onNextPage}
        className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-sky-500 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span>Next</span>
        <ChevronRight size={17} />
      </button>
    </nav>
  );
}
