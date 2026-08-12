# vue-tang-clan

A Vue 3 application rendered by Nitro, built with Vite, and styled with Tailwind CSS and shadcn-vue primitives. Pages use Vue Router with server-side rendering and hydration in the browser.

## Requirements

- Node.js 20 or later
- pnpm 10 or later

## Getting Started

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Vite. The application includes `/`, `/hello`, and `/foo` pages, plus an `/api/hello` example endpoint.

## Commands

| Command          | Description                                   |
| ---------------- | --------------------------------------------- |
| `pnpm dev`       | Start the Vite development server.            |
| `pnpm typecheck` | Run TypeScript checks without writing output. |
| `pnpm build`     | Build the client and Nitro server output.     |
| `pnpm preview`   | Preview the production build locally.         |

## Project Structure

```text
app/
	App.vue             Root application shell
	assets/style.css    Global Tailwind and shadcn-vue theme styles
	entry-client.ts     Browser entry point and hydration
	entry-server.ts     Server-side rendering entry point
	renderer.ts         Nitro renderer bridge
	router.ts           File-based Vue Router configuration
	pages/              Vue route components and Nitro API handlers
		api/              Nitro API handlers
components/ui/        Local shadcn-vue component primitives
lib/utils.ts          Tailwind class merging utility
public/               Static files served from the site root
components.json       shadcn-vue registry configuration
nitro.config.ts       Nitro server and prerender configuration
vite.config.ts        Vite and Nitro integration
```

## Routing

`app/router.ts` uses Vite's `import.meta.glob` to turn every `.vue` file under `app/pages` into a Vue Router route. The route path is the file path with the `app/pages` prefix and `.vue` extension removed. A trailing `index` becomes the directory root, and bracket segments become Vue Router parameters.

| File                       | URL          |
| -------------------------- | ------------ |
| `app/pages/index.vue`      | `/`          |
| `app/pages/hello.vue`      | `/hello`     |
| `app/pages/foo.vue`        | `/foo`       |
| `app/pages/blog/index.vue` | `/blog`      |
| `app/pages/users/[id].vue` | `/users/:id` |

### API Routes

Nitro discovers server handlers under the directory configured by `serverDir` in `nitro.config.ts`, which is `app/pages` in this project. API handler files are not included in the Vue client router, even though they share the same parent directory.

| Handler file                       | URL              | HTTP methods                               |
| ---------------------------------- | ---------------- | ------------------------------------------ |
| `app/pages/api/hello.ts`           | `/api/hello`     | Any method handled by the exported handler |
| `app/pages/api/users.ts`           | `/api/users`     | Any method handled by the exported handler |
| `app/pages/api/users/[id].ts`      | `/api/users/:id` | Any method handled by the exported handler |
| `app/pages/api/users/[id].get.ts`  | `/api/users/:id` | `GET` only                                 |
| `app/pages/api/users/[id].post.ts` | `/api/users/:id` | `POST` only                                |

Use a method suffix such as `.get.ts`, `.post.ts`, `.put.ts`, `.patch.ts`, or `.delete.ts` when an endpoint needs a method-specific handler. Without a method suffix, the exported handler receives every HTTP method and can branch on the request method when necessary.

## UI and Styling

Tailwind CSS is enabled through the Vite plugin. Use utility classes directly in Vue templates; global styles, theme tokens, and the Tailwind import live in `app/assets/style.css`.

The project uses [shadcn-vue](https://www.shadcn-vue.com/) with the `reka-nova` style, stone theme, Figtree font, and Lucide icons. Components are owned locally under `components/ui`, allowing their markup and styles to evolve with the app. Import them through the `~` alias:

```ts
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
```

Use `cn()` from `~/lib/utils` when combining conditional Tailwind classes.

## Build and Deploy

The production build prerenders the configured `/` and `/hello` entry routes, then crawls and includes linked application routes such as `/foo`. Nitro also retains runtime handlers such as `/api/hello` in `.output/server`.

```bash
pnpm build
pnpm preview
```

Deploy the generated `.output` directory to a Node.js-compatible host. See the [Nitro deployment documentation](https://nitro.build/deploy) for provider-specific guidance.
