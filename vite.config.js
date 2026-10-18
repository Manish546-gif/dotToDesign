import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: 'public',
  server: { host: 'localhost' },

  build: {
    // Target modern browsers — smaller output, native ESM
    target: 'es2020',

    // Terser for smaller bundles
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
        pure_getters: true,
      },
      mangle: { safari10: false },
    },

    // No source maps in production
    sourcemap: false,

    // Raise the warning limit slightly (GSAP is intentionally large)
    chunkSizeWarningLimit: 400,

    rollupOptions: {
      output: {
        // Content-hash file names for aggressive long-lived caching
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',

        // Manual chunk splitting so vendor code stays stable across deployments
        manualChunks(id) {
          // GSAP + ScrollTrigger — largest animation library
          if (id.includes('gsap')) return 'vendor-gsap';
          // Lenis smooth scroll
          if (id.includes('lenis')) return 'vendor-lenis';
          // React runtime (react + react-dom)
          if (id.includes('react-dom') || id.includes('node_modules/react/')) return 'vendor-react';
          // React Router
          if (id.includes('react-router')) return 'vendor-router';
        },
      },
    },

    // Inline small assets (< 4 KB) as data-URIs to save round-trips
    assetsInlineLimit: 4096,

    // CSS code splitting — each async chunk gets its own CSS file
    cssCodeSplit: true,
  },
});