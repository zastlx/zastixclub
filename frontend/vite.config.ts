import {defineConfig} from "vite";
import react from "@vitejs/plugin-react-swc";
import { randomBytes } from "node:crypto";
const funny = ["xotic", "acorn", "monkxypoo", "pablmao", "hacker", "syfe", "blooket"]

const vendors = {
    react: `${funny[Math.floor(Math.random() * funny.length)]}-${randomBytes(5).toString("hex")}`,
    other: `${funny[Math.floor(Math.random() * funny.length)]}-${randomBytes(5).toString("hex")}`,
    other2: `${funny[Math.floor(Math.random() * funny.length)]}-${randomBytes(5).toString("hex")}`,
    main: `${funny[Math.floor(Math.random() * funny.length)]}-${randomBytes(5).toString("hex")}`
}

export default defineConfig({
    plugins: [
        react()
    ],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:6969",
                changeOrigin: true
            }
        }
    },
    build: {
        sourcemap: false,
        minify: "terser",
        rollupOptions: {
            output: {
                chunkFileNames: "[name].js",
                entryFileNames: "[name].js",
                assetFileNames: "[name]-[hash][extname]",
                manualChunks: (id) => {
                    console.log(id);
                    if (id.includes("react")) return vendors["react"];
                    if (id.includes("util") || id.includes("rehype") || id.includes("remark") || id.includes("markdown") || id.includes("gfm") || id.includes("axios")) return vendors["other2"];
                    if (id.includes("node_modules")) return vendors["other"];
                    else return "real";
                },
                footer: "/* bean! - zastix developments llc */"
            }
        },
        terserOptions: {
            format: {
                comments: false
            },
            compress: {
                sequences: true,
                booleans: true,
                loops: true,
                toplevel: true,
                unsafe: true
            },
            module: true,
        }
    }
});