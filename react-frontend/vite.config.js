import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],

  // build: {
  //   chunkSizeWarningLimit: 1600, // 📌 increase chunk size limit

  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         react: ["react", "react-dom"],
  //         vendor: [
  //           "react-router",
  //           "lucide-react",
  //           "react-hot-toast",
  //         ],
  //       },
  //     },
  //   },
  // },
});
