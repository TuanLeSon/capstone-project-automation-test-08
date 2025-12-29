/* =====================================================
playwright.config.ts (root)
===================================================== */
import { defineConfig } from '@playwright/test';


export default defineConfig({
testDir: './src/tests',
timeout: 30_000,
expect: { timeout: 5000 },
fullyParallel: true,
workers: process.env.CI ? 2 : undefined,
// retries: 1,
retries: process.env.CI ? 1 : 0,
use: {
baseURL: 'https://demo1.cybersoft.edu.vn',

headless: true,
actionTimeout: 0,
navigationTimeout: 30_000,
trace: 'retain-on-failure',
screenshot: 'only-on-failure',
video: 'retain-on-failure',
viewport: { width: 1280, height: 720 },
ignoreHTTPSErrors: true,
},
projects: [
{ name: 'chromium', use: { browserName: 'chromium' } }
// , { name: 'webkit', use: { browserName: 'webkit' } }
],
reporter: [ ['list'], ['html', { outputFolder: 'playwright-report' }] ]
});