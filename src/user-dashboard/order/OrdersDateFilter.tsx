import { CalendarDays, X, ChevronDown } from "lucide-react";

export interface OrderDateFilterValue {
  startDate: string;
  endDate: string;
}

interface OrdersDateFilterProps {
  value: OrderDateFilterValue;
  onChange: (value: OrderDateFilterValue) => void;
  onClear: () => void;
}

type DateRange = "today" | "yesterday" | "7days" | "30days";

const getDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getDateRange = (range: DateRange): OrderDateFilterValue => {
  const today = new Date();

  const endDate = new Date(today);
  const startDate = new Date(today);

  switch (range) {
    case "today":
      break;

    case "yesterday":
      startDate.setDate(today.getDate() - 1);
      endDate.setDate(today.getDate() - 1);
      break;

    case "7days":
      startDate.setDate(today.getDate() - 6);
      break;

    case "30days":
      startDate.setDate(today.getDate() - 29);
      break;
  }

  return {
    startDate: getDateString(startDate),
    endDate: getDateString(endDate),
  };
};

export default function OrdersDateFilter({
  value,
  onChange,
  onClear,
}: OrdersDateFilterProps) {
  const hasFilter = Boolean(value.startDate || value.endDate);

  const filters: { label: string; value: DateRange }[] = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "7 Days", value: "7days" },
    { label: "30 Days", value: "30days" },
  ];

  const isActive = (range: DateRange) => {
    const selected = getDateRange(range);

    return (
      value.startDate === selected.startDate &&
      value.endDate === selected.endDate
    );
  };

  // Determine the currently active value to bind to the select dropdown
  const activeValue =
    filters.find((f) => isActive(f.value))?.value ||
    (hasFilter ? "custom" : "");

  return (
    <div className="flex w-full items-center gap-2 sm:w-auto">
      <div className="relative flex-1 sm:w-[200px] sm:flex-none">
        {/* Left Icon */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
          <CalendarDays size={15} strokeWidth={2.5} aria-hidden="true" />
        </div>

        {/* Compact Select Dropdown (Sorting Design) */}
        <select
          value={activeValue}
          onChange={(e) => {
            const val = e.target.value;
            if (!val) onClear();
            else if (val !== "custom") onChange(getDateRange(val as DateRange));
          }}
          className="w-full appearance-none rounded-lg border border-neutral-200 bg-white py-2 pl-9 pr-9 text-[13px] font-medium text-neutral-700 shadow-sm outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
        >
          <option value="">Filter by date...</option>

          {/* Fallback if a custom date is applied from outside these presets */}
          {hasFilter && activeValue === "custom" && (
            <option value="custom" disabled>
              Custom Range
            </option>
          )}

          {filters.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>

        {/* Right Caret Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400">
          <ChevronDown size={14} strokeWidth={2.5} aria-hidden="true" />
        </div>
      </div>

      {/* Clear Button (Only shows when filter is active) */}
      {hasFilter && (
        <button
          type="button"
          onClick={onClear}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-500 shadow-sm transition-colors hover:bg-neutral-100 hover:text-neutral-900 active:scale-95"
          aria-label="Clear filter"
        >
          <X size={15} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
