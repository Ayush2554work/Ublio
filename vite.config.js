import { defineConfig } from 'vite'

export default defineConfig({
    root: './',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: './index.html',
            }
        }
    },
    publicDir: 'public',
    assetsInclude: ['**/*.jpg', '**/*.png', '**/*.jpeg', '**/*.svg', '**/*.webp']
})
