interface AZLoaderProps {
  size?: number;
  text?: string;
}

export default function AZLoader({
  size = 72,
  text = "Loading...",
}: AZLoaderProps) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center">
      <h1
        className="az-loader select-none font-black leading-none tracking-tight"
        style={{ fontSize: `${size}px` }}
      >
        <span className="az-letter az-a">A</span>
        <span className="az-letter az-z">Z</span>
      </h1>

      <p className="mt-4 text-sm text-gray-500">{text}</p>
    </div>
  );
}
