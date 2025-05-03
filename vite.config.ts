import {defineConfig, PluginOption} from 'vite'
import {fileURLToPath, URL} from 'url';
import { ViteEjsPlugin } from 'vite-plugin-ejs';

export default defineConfig({
    root: '',
    base: '/',
    plugins: [
        ViteEjsPlugin({
        }) as PluginOption,
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        outDir: 'dist-tmp',
        emptyOutDir: false,
    },
})