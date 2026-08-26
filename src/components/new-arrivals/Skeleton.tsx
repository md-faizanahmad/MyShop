export default function Skeleton() {
  return (
    <div
      aria-label="Loading new arrivals"
      aria-busy="true"
      className="
        -mx-4 flex gap-3
        overflow-hidden px-4
        sm:-mx-6 sm:px-6
        lg:mx-0 lg:grid lg:grid-cols-4
        lg:gap-4 lg:px-0
        xl:grid-cols-5
      "
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="
            w-[150px] shrink-0
            overflow-hidden
            rounded-xl
            border border-zinc-100
            bg-white
            sm:w-[170px]
            lg:w-auto
          "
        >
          <div className="aspect-square animate-pulse bg-zinc-100" />

          <div className="space-y-2 p-3">
            <div className="h-3 w-full animate-pulse rounded bg-zinc-100" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-zinc-100" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-zinc-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
