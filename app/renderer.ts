import { fetchViteEnv } from "nitro/vite/runtime";

export default function renderer({ req }: { req: Request }) {
  return fetchViteEnv("ssr", req);
}