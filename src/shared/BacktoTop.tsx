import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling roughly half of the viewport
      setShowButton(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });

    setShowButton(false);
  }, [pathname]);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showButton) return null;

  return (
    <button
      type="button"
      onClick={handleBackToTop}
      aria-label="Back to top"
      title="Back to top"
      className="
        fixed
        right-4
        bottom-20
        z-50
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-zinc-200
        bg-white
        text-zinc-700
        shadow-md
        transition
        hover:border-red-200
        hover:bg-red-50
        hover:text-red-600
        active:scale-95
        sm:right-6
        sm:bottom-6
        sm:h-11
        sm:w-11
      "
    >
      <ArrowUp size={19} strokeWidth={2} />
    </button>
  );
}
