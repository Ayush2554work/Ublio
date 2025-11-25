import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    root: './',
    base: '/',  // Changed to root for Vercel deployment
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                products: resolve(__dirname, 'src/pages/products.html'),
                about: resolve(__dirname, 'src/pages/about.html'),
                contact: resolve(__dirname, 'src/pages/contact.html'),
                cart: resolve(__dirname, 'src/pages/cart.html'),
                checkout: resolve(__dirname, 'src/pages/checkout.html'),
                search: resolve(__dirname, 'src/pages/search.html'),
                login: resolve(__dirname, 'src/pages/auth/login.html'),
                register: resolve(__dirname, 'src/pages/auth/register.html'),
                dashboard: resolve(__dirname, 'src/pages/account/dashboard.html'),
                product: resolve(__dirname, 'src/pages/products/product.html'),
                collaboration: resolve(__dirname, 'src/pages/ublio-x-allexxa.html'),
                headphones: resolve(__dirname, 'src/pages/categories/headphones.html'),
                earbuds: resolve(__dirname, 'src/pages/categories/earbuds.html'),
                speakers: resolve(__dirname, 'src/pages/categories/speakers.html'),
                soundbars: resolve(__dirname, 'src/pages/categories/soundbars.html'),
                homeTheatre: resolve(__dirname, 'src/pages/categories/home-theatre.html'),
                studioHeadphones: resolve(__dirname, 'src/pages/categories/studio-headphones.html'),
                turntable: resolve(__dirname, 'src/pages/categories/turntable.html'),
                spectacles: resolve(__dirname, 'src/pages/categories/spectacles.html'),
            }
        }
    },
    publicDir: 'public',
    assetsInclude: ['**/*.jpg', '**/*.png', '**/*.jpeg', '**/*.svg', '**/*.webp']
})
