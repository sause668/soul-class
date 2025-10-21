import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/postcss";

// https://vitejs.dev/config/
export default defineConfig((mode) => ({
  plugins: [
    react(),
    tailwindcss(), 
    eslintPlugin({
      lintOnStart: true,
      failOnError: mode === "production",
    }),
  ],
  server: {
    open: true,
    proxy: {
      "/api": "http://127.0.0.1:8000",
    },
    // smr: {
    //   overlay: false,
    // }
  },
  // css: {
  //   postcss: {
  //     plugins: [
  //       require('@tailwindcss/postcss'), // Ensure this is present
  //       require('autoprefixer'),
  //     ],
  //   },
  // },
}));
