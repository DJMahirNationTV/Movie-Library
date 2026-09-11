import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import env from "dotenv";
env.config();

const backendUrl = process.env.BACKEND_URL || "http://localhost:8080"; // || bedeuetet "Fallback"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": backendUrl,
    },
  },
});
