/* =====================================================
playwright.config.ts (root)
===================================================== */
import { defineConfig } from '@playwright/test';


export default defineConfig({
testDir: './src/tests',
timeout: 60_000,
expect: { timeout: 5000 },
retries: 1,
use: {
baseURL: 'https://demo1.cybersoft.edu.vn',
headless: true,
trace: 'retain-on-failure',
screenshot: 'only-on-failure',
video: 'retain-on-failure'
},
projects: [
{ name: 'chromium', use: { browserName: 'chromium' } }
// , { name: 'webkit', use: { browserName: 'webkit' } }
],
reporter: [ ['list'], ['html', { outputFolder: 'playwright-report' }] ]
});