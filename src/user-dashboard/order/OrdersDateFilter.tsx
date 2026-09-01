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
    const endDate = event.target.value;

    onChange({
      ...value,
      endDate,
    });
  };

  return (
    <div className="mb-5 w-full">
      {/* Header */}
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="text-sky-600" aria-hidden="true" />

          <span className="text-sm font-medium text-gray-800">
            Filter by date
          </span>
        </div>

        {hasFilter && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 transition-colors hover:text-gray-800"
          >
            <X size={13} />
            Clear
          </button>
        )}
      </div>

      {/* Date fields */}
      <div className="flex items-center gap-2">
        {/* From */}
        <div className="relative min-w-0 flex-1">
          <label
            htmlFor="orders-start-date"
            className="absolute left-3 top-1.5 z-10 text-[10px] font-medium uppercase tracking-wide text-gray-400"
          >
            From
          </label>

          <CalendarDays
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />

          <input
            id="orders-start-date"
            type="date"
            value={value.startDate}
            max={value.endDate || undefined}
            onChange={handleStartDateChange}
            className="h-14 w-full appearance-none rounded-xl border border-gray-200 bg-white px-3 pb-1 pt-5 text-sm font-medium text-gray-800 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>

        {/* Separator */}
        <span className="shrink-0 text-xs text-gray-400" aria-hidden="true">
          —
        </span>

        {/* To */}
        <div className="relative min-w-0 flex-1">
          <label
            htmlFor="orders-end-date"
            className="absolute left-3 top-1.5 z-10 text-[10px] font-medium uppercase tracking-wide text-gray-400"
          >
            To
          </label>

          <CalendarDays
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />

          <input
            id="orders-end-date"
            type="date"
            value={value.endDate}
            min={value.startDate || undefined}
            onChange={handleEndDateChange}
            className="h-14 w-full appearance-none rounded-xl border border-gray-200 bg-white px-3 pb-1 pt-5 text-sm font-medium text-gray-800 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>
      </div>
    </div>
  );
}
