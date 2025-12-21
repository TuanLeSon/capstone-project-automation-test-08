/* =====================================================
src/utils/actionHelpers.ts
===================================================== */
import { Page, Locator } from '@playwright/test';
import { retry } from './retry/RetryHelper';


export async function clickWithRetry(page: Page, locatorOrSelector: Locator | string) {
return retry(async () => {
const el = typeof locatorOrSelector === 'string' ? page.locator(locatorOrSelector) : locatorOrSelector;
await el.waitFor({ state: 'visible', timeout: 3000 });
await el.scrollIntoViewIfNeeded();
await el.click();
}, 2, 150);
}


export async function fillWithRetry(page: Page, locatorOrSelector: Locator | string, text: string) {
return retry(async () => {
const el = typeof locatorOrSelector === 'string' ? page.locator(locatorOrSelector) : locatorOrSelector;
await el.waitFor({ state: 'visible', timeout: 3000 });
await el.fill(text);
}, 2, 150);
}