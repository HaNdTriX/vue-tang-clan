import { createSSRApp } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createMemoryHistory, createRouter } from "vue-router";
import { routes } from "vue-router/auto-routes";
import clientAssets from "./entry-client.ts?assets=client";
import { createHead, transformHtmlTemplate } from "@unhead/vue/server";
import App from "./App.vue";
import indexHTML from "./index.html?raw";

export async function fetch(request: Request) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { Allow: "GET, HEAD" },
    });
  }

  const app = createSSRApp(App);
  const router = createRouter({ history: createMemoryHistory(), routes });
  const head = createHead();

  const url = new URL(request.url);
  const href = url.href.slice(url.origin.length);

  app.use(router);
  app.use(head);

  await router.push(href);
  await router.isReady();

  const isNotFoundRoute = router.currentRoute.value.name === "/[...path]";

  if (router.currentRoute.value.matched.length === 0) {
    return new Response("Not Found", { status: 404 });
  }

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

  return new Response(request.method === "HEAD" ? null : html, {
    status: isNotFoundRoute ? 404 : 200,
    headers: { "Content-Type": "text/html;charset=utf-8" },
  });
}
