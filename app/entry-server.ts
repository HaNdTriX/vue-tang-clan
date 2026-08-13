import { createSSRApp } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createMemoryHistory, createRouter } from "vue-router";
import { routes } from "vue-router/auto-routes";
import clientAssets from "./entry-client.ts?assets=client";
import { createHead, transformHtmlTemplate } from "@unhead/vue/server";
import App from "./App.vue";
import indexHTML from "./index.html?raw";

export async function fetch(request: Request) {
  const app = createSSRApp(App);
  const router = createRouter({ history: createMemoryHistory(), routes });
  const head = createHead();

  const url = new URL(request.url);
  const href = url.href.slice(url.origin.length);

  app.use(router);
  app.use(head);

  await router.push(href);
  await router.isReady();

  const assets = clientAssets.merge(
    ...(await Promise.all(
      router.currentRoute.value.matched
        .map((to) => to.meta.assets)
        .filter(Boolean)
        .map((fn) => (fn as any)().then((m: any) => m.default)),
    )),
  );

  head.push({
    link: [
      ...assets.css.map((attrs: any) => ({ rel: "stylesheet", ...attrs })),
      ...assets.js.map((attrs: any) => ({ rel: "modulepreload", ...attrs })),
    ],
    script: [{ type: "module", src: clientAssets.entry }],
  });

  const body = await renderToString(app);
  const html = await transformHtmlTemplate(
    head,
    indexHTML.replace("<!--app-html-->", body),
  );

  return new Response(html, {
    headers: { "Content-Type": "text/html;charset=utf-8" },
  });
}
