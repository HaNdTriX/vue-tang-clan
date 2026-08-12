import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueRouter from "vue-router/vite";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig({
  plugins: [
    vueRouter({ routesFolder: "app/pages" }),
    vue(),
    devtoolsJson(),
    tailwindcss(),
    nitro(),
  ],
  environments: {
    client: {
      build: {
        rollupOptions: {
          input: "./app/entry-client.ts",
        },
      },
    },
    ssr: {
      build: {
        rollupOptions: {
          input: "./app/entry-server.ts",
        },
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
