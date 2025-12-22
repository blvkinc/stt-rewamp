import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Disable auto-open in CI/CD environments like Builder.io
    open: !process.env.CI && !process.env.BUILDER_IO,
    host: true // Allow external connections
  },
  build: {
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['antd', '@ant-design/icons'],
          'radix-vendor': ['@radix-ui/react-select', '@radix-ui/react-slot', '@radix-ui/react-tabs'],
          'utils': ['clsx', 'tailwind-merge', 'class-variance-authority']
        }
      }
    },
    // Optimize assets
    assetsInlineLimit: 4096,
    // Source maps for debugging (disable in production)
    sourcemap: false,
    // Use default minification (esbuild)
    minify: 'esbuild'
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})