import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
   root: './', 
   build: { outDir: 'dist',
    emptyOutDir: true 
    }, 
    resolve: { alias: 
      { '@': path.resolve(__dirname, 'src'),

       }, },
    // server: { 
    //   port: 3000, 
    // }, 
    plugins: [react()],
    css: { postcss: './postcss.config.js',}});
