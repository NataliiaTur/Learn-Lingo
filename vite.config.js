import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve("src/assets"),
      "@components": path.resolve("src/components"),
      "@context": path.resolve("src/context"),
      "@pages": path.resolve("src/pages"),
      "@redux": path.resolve("src/redux"),
      "@services": path.resolve("src/services"),
      "@styles": path.resolve("src/styles"),
      "@utils": path.resolve("src/utils"),
    },
  },
});
