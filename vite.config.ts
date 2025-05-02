import {defineConfig} from 'vite'
import {viteStaticCopy} from "vite-plugin-static-copy";

export default defineConfig({
    root: '',
    base: '/pl',
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: './public/*',
                    dest: './pl'
                },
                {
                    src: './public/*',
                    dest: './en'
                }
            ]
        })
    ],
    build: {
        outDir: 'dist',
        emptyOutDir: false,
        copyPublicDir: false,
        rollupOptions: {
            input: {
                pl: './dist/pl/index.html',
                en: './dist/en/index.html',
            },
            output: {
                entryFileNames: '[name]/assets/[name]-[hash].js',
                chunkFileNames: '[name]/assets/chunks/[name]-[hash].js',
                assetFileNames: '[name]/assets/[name]-[hash].[ext]',
            },
        },
    },
})