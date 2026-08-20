import { CalendarDays, X } from "lucide-react";

export interface OrderDateFilterValue {
  startDate: string;
  endDate: string;
}

interface OrdersDateFilterProps {
  value: OrderDateFilterValue;
  onChange: (value: OrderDateFilterValue) => void;
  onClear: () => void;
}

export default function OrdersDateFilter({
  value,
  onChange,
  onClear,
}: OrdersDateFilterProps) {
  const hasFilter = Boolean(value.startDate || value.endDate);

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const startDate = event.target.value;

    onChange({
      startDate,
      endDate: value.endDate && startDate > value.endDate ? "" : value.endDate,
    });
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      endDate: event.target.value,
    });
  };

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end">
      {/* Start Date */}
      <div className="min-w-0 flex-1">
        <label
          htmlFor="orders-start-date"
          className="mb-1.5 block text-xs font-medium text-gray-600"
        >
          From
        </label>

        <div className="relative">
          <CalendarDays
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />

          <input
            id="orders-start-date"
            type="date"
            value={value.startDate}
            max={value.endDate || undefined}
            onChange={handleStartDateChange}
            className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm text-gray-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          />
        </div>
      </div>

      {/* End Date */}
      <div className="min-w-0 flex-1">
        <label
          htmlFor="orders-end-date"
          className="mb-1.5 block text-xs font-medium text-gray-600"
        >
          To
        </label>

        <div className="relative">
          <CalendarDays
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />

          <input
            id="orders-end-date"
            type="date"
            value={value.endDate}
            min={value.startDate || undefined}
            onChange={handleEndDateChange}
            className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm text-gray-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          />
        </div>
      </div>

      {/* Clear */}
      {hasFilter && (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
          aria-label="Clear date filter"
        >
          <X size={15} />
          Clear
        </button>
      )}
    </div>
  );
}
