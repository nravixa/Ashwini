import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { imagetools } from 'vite-imagetools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.has('optimized')) {
          return new URLSearchParams({
            format: 'avif;webp;jpg',
            w: '480;768;1024;1440;1920;2560',
            as: 'picture',
          });
        }
        return new URLSearchParams();
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    modulePreload: false,
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'react-router-dom'
          ],
          three: [
            'three',
            '@react-three/fiber',
            '@react-three/drei'
          ],
          ui: [
            'lucide-react',
            'clsx',
            'tailwind-merge'
          ]
        }
      }
    }
  },
  esbuild: {
    drop: ['console', 'debugger'],
  }
});
