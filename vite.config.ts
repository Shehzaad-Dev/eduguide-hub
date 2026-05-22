import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tanstackRouter from "@tanstack/router-plugin/vite";

export default defineConfig(({ command }) => ({
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    tanstackRouter(),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    // Cloudflare pre-bundles server deps during `vite dev` and breaks TanStack virtual imports
    ...(command === "serve" ? [] : [cloudflare()]),
  ],
}));
