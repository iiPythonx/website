import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import svgr from "vite-plugin-svgr";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
    plugins: [preact(), svgr(), cloudflare()],
});
