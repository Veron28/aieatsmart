import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(() => {
    return {
        envPrefix: "EATSMART_",
        build: {
            outDir: "build",
        },
        plugins: [react()],
    }
})
