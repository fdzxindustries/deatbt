import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" supaya jalan di GitHub Pages (subpath repo) maupun domain sendiri
export default defineConfig({
  plugins: [react()],
  base: "./",
});
