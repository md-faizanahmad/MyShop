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

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200/50">
            <CalendarDays size={14} strokeWidth={2.5} aria-hidden="true" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-neutral-900">
            Filter by date
          </span>
        </div>

        {hasFilter && (
          <button
            type="button"
            onClick={onClear}
            className="group flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold text-neutral-600 transition-all hover:bg-neutral-200 hover:text-neutral-900 active:scale-95"
          >
            <X
              size={12}
              strokeWidth={3}
              className="transition-transform group-hover:rotate-90"
            />
            Clear
          </button>
        )}
      </div>

      {/* Preset filters - Modern pill/grid layout */}
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
        {filters.map((filter) => {
          const active = isActive(filter.value);

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => onChange(getDateRange(filter.value))}
              className={`relative flex h-9 items-center justify-center rounded-lg border px-4 text-[13px] font-medium transition-all duration-200 ease-out active:scale-[0.97] sm:h-9 ${
                active
                  ? "border-neutral-900 bg-neutral-900 text-white shadow-md shadow-neutral-900/10"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
