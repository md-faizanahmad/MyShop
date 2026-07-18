interface AZLoaderProps {
  size?: number;
  text?: string;
}

export default function AZLoader({
  size = 84,
  text = "Loading...",
}: AZLoaderProps) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center">
      <h1
        className="az-loader select-none font-black leading-none tracking-[-0.06em]"
        style={{ fontSize: `${size}px` }}
      >
        <span className="az-fill">AZ</span>
      </h1>

      <p className="mt-5 text-sm text-gray-500">{text}</p>
    </div>
  );
}
