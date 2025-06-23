import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@common': path.resolve(__dirname, 'src/common'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@layouts': path.resolve(__dirname, 'src/layouts'),
            '@inventory': path.resolve(__dirname, 'src/features/inventory'),
        }
    },
    define: {
        'process.env': {}
    },
    server: {
        port: 3000
    }
})