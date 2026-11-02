import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir: './tests', workers: 1, timeout: 30000,
 use: { baseURL: 'http://127.0.0.1:4175', browserName: 'chromium', headless: true },
 webServer: [
  { command: 'npm run build && npm run preview -- --port 4175 --strictPort', url: 'http://127.0.0.1:4175', reuseExistingServer: false },
 ]
});
