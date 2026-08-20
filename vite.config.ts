import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";

export default defineConfig({
  envPrefix: "VITE_",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // auto-check & update
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "AZ-Store",
        short_name: "AZStore",
        description: "Your fast and modern shopping app",
        theme_color: "#0ea5a4",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",

        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-512x512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico,json}"],
      },
      devOptions: {
        enabled: true, // optional; makes it easier to test SW during dev
      },
    }),
  ],
});

/*
Note:
- If you have a stray package named @tailwindcss/vite, remove it. Tailwind runs via postcss/tailwind config files.
- Ensure your icon files live in /public so they are available at build time.
*/
