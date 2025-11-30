// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";

// const queryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <QueryClientProvider client={queryClient}>
//     <App />
//   </QueryClientProvider>
// );
////// Updated with cache
// // main.tsx
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       // Shopping-site friendly defaults
//       staleTime: 30_000, // data is "fresh" for 30s
//       gcTime: 1000 * 60 * 10, // keep unused cache for 10 minutes (was cacheTime in older versions)
//       retry: 1,
//       refetchOnWindowFocus: false,
//     },
//   },
// });

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <QueryClientProvider client={queryClient}>
//     <App />
//   </QueryClientProvider>
// );

// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element not found");

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
