import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";

const getPath = (route: string) => path.resolve(__dirname, route);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/components": getPath("./src/common/components"),
      "@/stores": getPath("./src/common/stores"),
      "@/utils": getPath("./src/common/utils"),
      "@/api": getPath("./src/common/api"),
      "@/": getPath("./src"),
    },
  },

  plugins: [react()],
});
