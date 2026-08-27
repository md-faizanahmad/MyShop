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
    <div className="mb-5 flex flex-wrap items-end gap-2.5">
      {/* From */}
      <div className="w-full sm:w-auto">
        <label
          htmlFor="orders-start-date"
          className="mb-1 block text-[11px] font-medium text-gray-500"
        >
          From
        </label>

        <div className="relative">
          <CalendarDays
            size={14}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />

          <input
            id="orders-start-date"
            type="date"
            value={value.startDate}
            max={value.endDate || undefined}
            onChange={handleStartDateChange}
            className="h-9 w-full rounded-md border border-gray-200 bg-white pl-8 pr-2 text-xs text-gray-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 sm:w-[145px]"
          />
        </div>
      </div>

      {/* To */}
      <div className="w-full sm:w-auto">
        <label
          htmlFor="orders-end-date"
          className="mb-1 block text-[11px] font-medium text-gray-500"
        >
          To
        </label>

        <div className="relative">
          <CalendarDays
            size={14}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />

          <input
            id="orders-end-date"
            type="date"
            value={value.endDate}
            min={value.startDate || undefined}
            onChange={handleEndDateChange}
            className="h-9 w-full rounded-md border border-gray-200 bg-white pl-8 pr-2 text-xs text-gray-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 sm:w-[145px]"
          />
        </div>
      </div>

      {/* Clear */}
      {hasFilter && (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex h-9 items-center justify-center gap-1 rounded-md border border-gray-200 bg-white px-3 text-xs font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-800"
          aria-label="Clear date filter"
        >
          <X size={13} />
          Clear
        </button>
      )}
    </div>
  );
}
