import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { nitro } from "nitro/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tanstackRouter from "@tanstack/router-plugin/vite";

const tanstackOptimizeDepsExclude = [
  "@tanstack/start-server-core",
  "@tanstack/start-client-core",
  "@tanstack/react-start",
  "@tanstack/react-start/client",
  "@tanstack/react-start/server",
];

export default defineConfig(({ command }) => {
  const isServe = command === "serve";

  return {
    plugins: [
      tanstackStart({
        server: { entry: "server" },
      }),
      tanstackRouter({
        // routeTree.gen.ts is committed; regenerate with `npm run generate:routes`
        enableRouteGeneration: false,
      }),
      // Vercel: Nitro emits .vercel/output so "/" SSR works. Local/CI without VERCEL uses Cloudflare.
      ...(isServe
        ? []
        : process.env.VERCEL
          ? [nitro({ preset: "vercel" })]
          : [cloudflare()]),
      react(),
      tailwindcss(),
      tsconfigPaths(),
    ],
    server: {
      port: 5173,
      strictPort: true,
    },
    optimizeDeps: {
      exclude: tanstackOptimizeDepsExclude,
    },
    ssr: {
      optimizeDeps: {
        exclude: tanstackOptimizeDepsExclude,
      },
    },
  };
});
