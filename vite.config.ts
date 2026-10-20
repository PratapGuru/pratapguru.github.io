import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// This site is published as a GitHub *user* site (https://pratapguru.github.io/),
// which is served from the domain root — so the base path is '/'.
// If you ever move it to a project repo (e.g. github.com/PratapGuru/portfolio),
// change this to '/portfolio/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: false,
  },
});
