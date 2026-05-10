import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 5173,
    proxy: {
      '/v1': {
        target: 'http://localhost:8080',   // Cổng backend
        changeOrigin: true,
        ws: true                          // Bắt buộc cho WebSocket
      }
    }
  }
});