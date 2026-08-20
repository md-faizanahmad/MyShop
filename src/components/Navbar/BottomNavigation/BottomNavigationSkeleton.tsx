export default function BottomNavigationSkeleton() {
  return (
    <nav
      aria-hidden="true"
      className="
        fixed inset-x-0 bottom-0 z-40
        bg-white/80
        backdrop-blur-xl
        backdrop-saturate-150
        pb-[env(safe-area-inset-bottom)]
        md:hidden
      "
    >
      <div className="flex h-16 items-stretch">
        {Array.from({ length: 5 }).map((_, index) => {
          const isExplore = index === 2;

          return (
            <div
              key={index}
              className="relative flex min-w-0 flex-1 flex-col items-center justify-center"
            >
              {isExplore && (
                <span
                  className="
                    pointer-events-none
                    absolute left-1/2 top-0
                    h-16 w-16
                    -translate-x-1/2 -translate-y-1/2
                    rounded-full
                    bg-white
                  "
                />
              )}

              <div
                className={`
                  relative z-10 animate-pulse rounded-full bg-neutral-200
                  ${
                    isExplore
                      ? "h-12 w-12 -translate-y-6 ring-4 ring-white"
                      : "h-9 w-9"
                  }
                `}
              />

              <div
                className={`
                  relative z-10 mt-1 h-2.5 animate-pulse rounded-full bg-neutral-200
                  ${isExplore ? "-mt-2" : ""}
                `}
              />
            </div>
          );
        })}
      </div>
    </nav>
  );
}
