import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const mode = process.env.NODE_ENV;
const prodBase = "/web_app_lebron/";

export default defineConfig({
  plugins: [react()],
  base: mode === "production" ? prodBase : "/",
  build: {
    outDir: "docs",
  },
});
