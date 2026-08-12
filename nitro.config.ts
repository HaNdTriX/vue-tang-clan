import { defineConfig } from "nitro";

export default defineConfig({
  serverDir: "./app/pages",
  renderer: {
    handler: "./app/renderer.ts",
  },
  prerender: {
    routes: ["/", "/hello"],
    failOnError: true,
  },
});
