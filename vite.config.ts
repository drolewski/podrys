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
                    dest: './dist/pl'
                },
                {
                    src: './public/*',
                    dest: './dist/en'
                }
            ]
        })
    ],
    build: {
        copyPublicDir: false,
        // rollupOptions: {
        //     input: {
        //         pl: 'dist/pl/index.html',
        //         en: 'dist/en/index.html'
        //     },
        //     output: {
        //         entryFileNames: 'assets/[name].js',
        //         chunkFileNames: 'assets/[name]-[hash].js',
        //         assetFileNames: 'assets/[name]-[hash][extname]'
        //     }
        // },
        outDir: './dist',
        emptyOutDir: true
    }
})