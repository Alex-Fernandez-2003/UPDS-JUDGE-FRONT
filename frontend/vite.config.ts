import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.API_PROXY_TARGET || 'http://localhost:5185'

  return {
    plugins: [react(), tailwindcss()],
    optimizeDeps: {
      include: ['react-simple-code-editor'],
    },
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    server: {
      port: 8085,
      strictPort: true,
      proxy: { '/api': { target: proxyTarget, changeOrigin: true } },
    },
    preview: { port: 8085, strictPort: true },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/setup.ts',
      env: {
        VITE_APP_NAME: 'UPDS Judge',
        VITE_API_BASE_URL: '/api',
        VITE_REQUEST_TIMEOUT_MS: '10000',
        VITE_ENABLE_MOCKS: 'false',
      },
    },
  }
})
