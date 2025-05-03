import {defineConfig} from 'vite'
import {fileURLToPath, URL} from 'url';

export default defineConfig({
    root: '',
    base: '/',
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