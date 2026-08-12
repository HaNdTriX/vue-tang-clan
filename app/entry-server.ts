import { createSSRApp } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createMemoryHistory, createRouter } from "vue-router";
import { routes } from "vue-router/auto-routes";
import App from "./App.vue";
import clientAssets from "./entry-client.ts?assets=client";

export default {
  async fetch(request: Request) {
    const router = createRouter({ history: createMemoryHistory(), routes });
    const app = createSSRApp(App);
    const url = new URL(request.url);

    app.use(router);
    await router.push(url.pathname);
    await router.isReady();

    const body = await renderToString(app);

    return new Response(
      `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>Vue Tang Clan</title>
    ${clientAssets.css.map((asset: { href: string }) => `<link rel="stylesheet" href="${asset.href}" />`).join("\n    ")}
  </head>
  <body>
    <div id="app">${body}</div>
    <script type="module" src="${clientAssets.entry}"></script>
  </body>
</html>`,
      {
        headers: { "content-type": "text/html;charset=utf-8" },
      },
    );
  },
};
