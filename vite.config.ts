import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueRouter from "vue-router/vite";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig({
  plugins: [
    vueRouter({
      routesFolder: "app/pages",
      exclude: ["app/pages/api/**"],
    }),
    vue(),
    devtoolsJson(),
    tailwindcss(),
    nitro({
      serverDir: "app/pages",
      prerender: {
        routes: ["/", "/ssg"],
      },
    }),
  ],
  environments: {
    client: { build: { rollupOptions: { input: "app/entry-client.ts" } } },
    ssr: { build: { rollupOptions: { input: "app/entry-server.ts" } } },
    nitro: {
      build: {
        rollupOptions: { treeshake: { moduleSideEffects: () => false } },
      },
    },
  },
  resolve: {
    alias: {
      "~": fileURLToPath(new URL(".", import.meta.url)),
    },
    tsconfigPaths: true,
  },
});
