import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite";
import path from 'path'

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss()
    ],
    resolve: {
        alias: {
            '@domain': path.resolve(__dirname, 'src/domain'),
            '@app': path.resolve(__dirname, 'src/application'),
            '@infra': path.resolve(__dirname, 'src/infrastructure'),
            '@ui': path.resolve(__dirname, 'src/ui'),
            '@shared': path.resolve(__dirname, 'src/shared'),
            '@store': path.resolve(__dirname, 'src/store'),
        }
    },
    define: {
        'process.env': {}
    },
    server: {
        port: 3000
    }
})
