import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";

function stubNuxtImportMeta(): Plugin {
  return {
    name: "stub-nuxt-import-meta",
    transform(code, id) {
      if (id.includes("node_modules")) return;
      if (!/import\.meta\.(client|server)/.test(code)) return;

      return code
        .replace(/import\.meta\.client/g, "true")
        .replace(/import\.meta\.server/g, "false");
    },
  };
}

export default defineConfig({
  plugins: [stubNuxtImportMeta()],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./app", import.meta.url)),
      "@": fileURLToPath(new URL("./app", import.meta.url)),
    },
  },
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/unit/**/*.test.ts", "tests/integration/**/*.test.ts"],
  },
});
