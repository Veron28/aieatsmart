import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(() => {
    return {
        envPrefix: "EATSMART_",
        build: {
            outDir: "build",
            minify: "esbuild",
            cssMinify: "lightningcss",
        },
        plugins: [react()],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src/", import.meta.url)),
            },
        },
    }
})
