import { useEffect } from "react";

interface AZLoaderProps {
  size?: number;
  text?: string;
  overlay?: boolean;
}

export default function AZLoader({
  size = 60,
  text = "Loading...",
  overlay = true,
}: AZLoaderProps) {
  useEffect(() => {
    if (!overlay) return;

    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [overlay]);

  const loader = (
    <div className="flex flex-col items-center justify-center select-none">
      <h1 className="az-loader" style={{ fontSize: `${size}px` }}>
        <span className="az-letter az-a" data-letter="A">
          A
        </span>

        <span className="az-letter -z-44 az-z relative -ml-2" data-letter="Z">
          Z
        </span>
      </h1>

      {text && (
        <p className="mt-5 text-sm font-medium text-gray-500 dark:text-gray-400">
          {text}
        </p>
      )}
    </div>
  );

  if (!overlay) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        {loader}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-md dark:bg-black/60">
      {loader}
    </div>
  );
}
