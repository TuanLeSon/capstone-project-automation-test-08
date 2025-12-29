/* =====================================================
src/ui/base/BasePage.ts
===================================================== */
import { Page, expect, Locator } from '@playwright/test';
import { clickWithRetry, fillWithRetry } from '../../utils/actionHelpers';


export class BasePage {
    constructor(protected readonly page: Page) { }

    async smartNavigate(url: string, expectedUrl?: string) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
        if (!expectedUrl) return;
        try { await expect(this.page).toHaveURL(expectedUrl, { timeout: 3000 }); }
        catch { await this.page.goto(url, { waitUntil: 'domcontentloaded' }); await expect(this.page).toHaveURL(expectedUrl); }
    }

    async click(locator: Locator | string) { return clickWithRetry(this.page, locator); }
    
    async fill(locator: Locator | string, text: string) { return fillWithRetry(this.page, locator, text); }
    
    async clickRandomlyFrom(locators: Locator) {
        const count = await locators.count();
        const randomIndex = Math.floor(Math.random() * count);
        await locators.nth(randomIndex).click();
    }

    async getRandomTextFrom(locators: Locator): Promise<string> {
        const count = await locators.count();
        const randomIndex = Math.floor(Math.random() * count);
        return locators.nth(randomIndex).innerText();
    }
}