// src/pages/TestLoader.tsx

import AZLoader from "./shared/AZLoader";

export default function TestLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <AZLoader size={100} text="Loading your order..." />
    </div>
  );
}
