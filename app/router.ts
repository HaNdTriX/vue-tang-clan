import type { Component } from "vue";
import {
  createRouter,
  createWebHistory,
  type RouterHistory,
  type RouteRecordRaw,
} from "vue-router";

type PageModule = {
  default: Component;
};

const pageModules = import.meta.glob<PageModule>("./pages/**/*.vue");

function filePathToRoutePath(filePath: string) {
  const routePath = filePath
    .replace("./pages", "")
    .replace(/\.vue$/, "")
    .replace(/\/index$/, "")
    .replace(/\[([^\]]+)\]/g, ":$1");

  return routePath || "/";
}

export const routes: RouteRecordRaw[] = Object.entries(pageModules).map(
  ([filePath, loadPage]) => ({
    path: filePathToRoutePath(filePath),
    component: () => loadPage().then((page) => page.default),
  }),
);

export function createAppRouter(history: RouterHistory = createWebHistory()) {
  return createRouter({ history, routes });
}
