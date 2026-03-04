import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/paralegal-services-demo/",
  plugins: [react()],
  build: {
    outDir: "docs",
  },
});
