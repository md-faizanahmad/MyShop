// // import { defineConfig } from "vite";
// // import react from "@vitejs/plugin-react";
// // import { VitePWA } from "vite-plugin-pwa";
// // import tailwindcss from "@tailwindcss/vite";
// // export default defineConfig({
// //   envPrefix: "VITE_",
// //   plugins: [
// //     tailwindcss(),
// //     react(),

// //     VitePWA({
// //       registerType: "autoUpdate",
// //       manifest: {
// //         name: "AZ-Store",
// //         short_name: "Shopping App",
// //         theme_color: "#ffffff",
// //         icons: [
// //           {
// //             src: "/icon-192x192.png",
// //             sizes: "192x192",
// //             type: "image/png",
// //           },
// //         ],
// //       },
// //     }),
// //   ],
// // });
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa";

// export default defineConfig({
//   envPrefix: "VITE_",
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: "autoUpdate",
//       includeAssets: [
//         "favicon.ico",
//         "robots.txt",
//         "apple-touch-icon.png", // optional but recommended for iOS
//       ],
//       manifest: {
//         name: "AZ-Store",
//         short_name: "AZStore",
//         description: "Shopping App - AZ-Store",
//         theme_color: "#ffffff",
//         background_color: "#ffffff",
//         display: "standalone",
//         scope: "/",
//         start_url: "/?source=pwa",
//         icons: [
//           {
//             src: "/pwa-48x48.png",
//             sizes: "48x48",
//             type: "image/png",
//           },
//           {
//             src: "/pwa-72x72.png",
//             sizes: "72x72",
//             type: "image/png",
//           },
//           {
//             src: "/pwa-96x96.png",
//             sizes: "96x96",
//             type: "image/png",
//           },
//           {
//             src: "/pwa-144x144.png",
//             sizes: "144x144",
//             type: "image/png",
//           },
//           {
//             src: "/pwa-192x192.png",
//             sizes: "192x192",
//             type: "image/png",
//           },
//           {
//             src: "/pwa-256x256.png",
//             sizes: "256x256",
//             type: "image/png",
//           },
//           {
//             src: "/pwa-384x384.png",
//             sizes: "384x384",
//             type: "image/png",
//           },
//           {
//             src: "/pwa-512x512.png",
//             sizes: "512x512",
//             type: "image/png",
//           },
//           // maskable for proper Android adaptive icon rendering
//           {
//             src: "/pwa-512x512-maskable.png",
//             sizes: "512x512",
//             type: "image/png",
//             purpose: "maskable",
//           },
//         ],
//       },
//       workbox: {
//         // tweak caching rules; default is fine but explicit options help avoid surprises
//         globPatterns: ["**/*.{js,css,html,png,svg,ico,json}"],
//       },
//     }),
//   ],
// });
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  envPrefix: "VITE_",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // auto-check & update
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "AZ-Store",
        short_name: "AZStore",
        description: "AZ-Store shopping app",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/?source=pwa",
        icons: [
          { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
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
