import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({ mode }) => ({
 plugins: [react()], publicDir: false,
 cacheDir: `node_modules/.vite/${mode}`,
 build: { assetsDir: 'static' }
}));
