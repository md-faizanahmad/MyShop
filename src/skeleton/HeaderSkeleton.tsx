export default function HeaderSkeleton() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg shadow-md border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 animate-pulse">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gray-200" />
            <div className="h-5 w-24 rounded bg-gray-200" />
          </div>

          {/* Desktop Navbar */}
          <div className="hidden lg:flex flex-1 max-w-3xl mx-8 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-20 rounded bg-gray-200" />
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="h-9 w-9 rounded-full bg-gray-200" />

            {/* Wishlist + Cart */}
            <div className="hidden md:flex gap-3">
              <div className="h-9 w-9 rounded-full bg-gray-200" />
              <div className="h-9 w-9 rounded-full bg-gray-200" />
            </div>

            {/* User Menu */}
            <div className="h-9 w-9 rounded-full bg-gray-200" />

            {/* Mobile Menu */}
            <div className="lg:hidden h-9 w-9 rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
    </header>
  );
}
