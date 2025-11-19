import { Locator, Page } from "@playwright/test";


type PlaywrightLocator = Locator | string; //define union type for locator parameter

export class BasePage {
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async navigateTo(url: string = '/'): Promise<void>{
        await this.page.goto(url);
    }

    async getPageTitle(): Promise<string>{
        return this.page.title();
    }

    async waitForLoad(state: "load" | "domcontentloaded" | "networkidle" = "load"): Promise<void>{
        await this.page.waitForLoadState(state);
    }

    async waitForUrl(path: string) {
        await this.page.waitForURL(`**${path}`);
    }

    async click(locator: PlaywrightLocator, options?: { delay?: number; button?: "left" | "right" | "middle"; clickCount?: number; timeout?: number; }) {
        if (typeof locator === 'string'){
            await this.page.locator(locator).click(options);
        } else {
            await locator.click();
        } 
    }

    async fill(locator: PlaywrightLocator, text: string | null){
        if (text === null || text === undefined) {
            return;
        } else if (typeof locator === 'string'){
            await this.page.locator(locator).fill(text);
        } else {
            await locator.fill(text);
        }
    }
}