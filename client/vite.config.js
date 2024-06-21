import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001', // Your API server address
        changeOrigin: true,
        rewrite: (path) => path.startsWith('/api') ? path : '/api' + path, // Adjusted path replacement
      },
    },
  },
  build: {
    outDir: 'build', // Specify the output directory as "build"
  },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@pages': '/src/pages',
      // Add more aliases as needed
    },
  },
});
