import adapter from '@sveltejs/adapter-static';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    enhancedImages(),
    sveltekit({
      adapter: adapter({ pages: 'build', assets: 'build', strict: true, precompress: false }),
      files: { assets: 'public' },
      paths: { origin: 'https://slushuptt.com' }
    })
  ],
  build: { assetsInlineLimit: 0 },
  server: { host: '127.0.0.1' }
});
