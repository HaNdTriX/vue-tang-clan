# vuetro

A compact Vue 3 and Nitro reference application. It demonstrates three useful building blocks without hiding them behind starter-kit machinery:

- a Vue page rendered by Nitro for each request (`/ssr`)
- a Vue page prerendered during the production build (`/ssg`)
- a small Nitro API handler (`/api/hello`)

Vite builds the application, Vue Router generates routes from files under `app/pages`, Tailwind styles the UI, and local shadcn-vue primitives supply the components.

## Requirements

- Node.js 20 or later
- pnpm 10 or later

## Getting Started

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Vite, then visit the examples:

| Route        | What it demonstrates                                           |
| ------------ | -------------------------------------------------------------- |
| `/`          | A client-side request to the Nitro API handler.                |
| `/ssr`       | Request-time HTML rendering followed by Vue hydration.         |
| `/ssg`       | HTML generated at build time, plus local component primitives. |
| `/api/hello` | A JSON handler that returns `{ "api": "works!" }`.             |

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
	pages/              Vue route components and Nitro API handlers
		index.vue         Landing page and API request example
		ssr.vue           Server-rendered route example
		ssg.vue           Prerendered route and component example
		api/              Nitro API handlers
	components/ui/      Local shadcn-vue component primitives
	lib/utils.ts        Tailwind class merging utility
public/               Static files served from the site root
components.json       shadcn-vue registry configuration
vite.config.ts        Vite, Vue Router, Tailwind, and Nitro configuration
```

## Routing

`vue-router/vite` generates Vue Router routes from `.vue` files under `app/pages`. A trailing `index` becomes the directory root, and bracket segments become Vue Router parameters.

| File                       | URL          |
| -------------------------- | ------------ |
| `app/pages/index.vue`      | `/`          |
| `app/pages/ssr.vue`        | `/ssr`       |
| `app/pages/ssg.vue`        | `/ssg`       |
| `app/pages/blog/index.vue` | `/blog`      |
| `app/pages/users/[id].vue` | `/users/:id` |

### API Routes

Nitro discovers the handler in `app/pages/api/hello.ts`. API handler files are not added to the Vue client router, even though they share the same parent directory.

| Handler file             | URL          | HTTP methods                               |
| ------------------------ | ------------ | ------------------------------------------ |
| `app/pages/api/hello.ts` | `/api/hello` | Any method handled by the exported handler |

Use a method suffix such as `.get.ts`, `.post.ts`, `.put.ts`, `.patch.ts`, or `.delete.ts` when an endpoint needs a method-specific handler. Without a method suffix, the exported handler receives every HTTP method and can branch on the request method when necessary.

## UI and Styling

Tailwind CSS is enabled through the Vite plugin. Use utility classes directly in Vue templates; global styles, theme tokens, and the Tailwind import live in `app/assets/style.css`.

The project uses [shadcn-vue](https://www.shadcn-vue.com/) with the `reka-nova` style, stone theme, Figtree font, and Lucide icons. Components are owned locally under `app/components/ui`, allowing their markup and styles to evolve with the app. Import them through the `~` alias:

```ts
import { Button } from "~/app/components/ui/button";
import { Card, CardContent, CardHeader } from "~/app/components/ui/card";
```

Use `cn()` from `~/app/lib/utils` when combining conditional Tailwind classes.

## Rendering and Deployment

The `nitro()` plugin in `vite.config.ts` prerenders `/` and `/ssg` during `pnpm build`. `/ssr` remains a request-time route that Nitro renders through `app/renderer.ts`, while `/api/hello` remains available as a runtime JSON endpoint.

```bash
pnpm build
pnpm preview
```

Deploy the generated `.output` directory to a Node.js-compatible host. See the [Nitro deployment documentation](https://nitro.build/deploy) for provider-specific guidance.
