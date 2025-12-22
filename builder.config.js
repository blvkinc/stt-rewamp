// Builder.io Configuration
// This file helps Builder.io understand your project structure

export default {
  // Build configuration
  build: {
    command: 'npm run build',
    output: 'dist',
    environment: {
      NODE_VERSION: '18',
      CI: 'true',
      BUILDER_IO: 'true'
    }
  },
  
  // Development configuration for Builder.io
  dev: {
    command: 'npm run dev:ci',
    port: 3000
  },
  
  // Framework detection
  framework: 'vite',
  
  // Static file handling
  staticFiles: [
    'public/**/*'
  ],
  
  // Environment variables (add as needed)
  env: {
    CI: 'true',
    BUILDER_IO: 'true'
    // Add your environment variables here
    // VITE_API_URL: process.env.VITE_API_URL
  },
  
  // Headers for security and performance
  headers: [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        }
      ]
    },
    {
      source: '/assets/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    }
  ],
  
  // Redirects (if needed)
  redirects: [
    // Add redirects here if needed
  ],
  
  // Functions (if using serverless functions)
  functions: {
    // Add serverless functions configuration if needed
  }
}