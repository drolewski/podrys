import {defineConfig} from 'vite'
import {viteStaticCopy} from "vite-plugin-static-copy";

export default defineConfig({
    root: 'src',
    base: '/pl',
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: '../public/*',
                    dest: ''
                }
            ]
        })
    ],
    build: {
        rollupOptions: {
            input: {
                pl: 'src/pl/index.html',
                en: 'src/en/index.html'
            },
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash][extname]'
            }
        },
        outDir: '../dist',
        emptyOutDir: true
    }
})