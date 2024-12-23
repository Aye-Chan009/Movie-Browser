import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    define: {
    global: 'window',  // Polyfill the `global` variable with `window`
  },
  optimizeDeps: {
    include: ['amazon-cognito-identity-js'], // Ensure amazon-cognito-identity-js is pre-bundled
  },
})
