import {defineConfig, PluginOption} from 'vite'
import {fileURLToPath, URL} from 'url';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import {resolve} from "path";

export default defineConfig({
    root: '',
    base: '/',
    plugins: [
        ViteEjsPlugin({
        }) as PluginOption,
    ],
    resolve: {
        alias: {
            // @ts-ignore
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, '/src/pages/about/index.html'),
                contact: resolve(__dirname, '/src/pages/contact/index.html'),
            },
        },
        outDir: 'dist-tmp',
        emptyOutDir: false,
    },
})