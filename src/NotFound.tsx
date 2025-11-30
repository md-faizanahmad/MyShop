// import Lottie from "lottie-react";
// import animationData from "./assets/404.json";

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* <div className="w-full max-w-xs">
        <Lottie animationData={animationData} loop={true} />
      </div> */}
      <h1 className="text-3xl font-bold mt-4">Page not found</h1>
      <p>Pkease Refresh Page or use FLigh Mode</p>
      <Link to="/">Home</Link>
    </div>
  );
}
