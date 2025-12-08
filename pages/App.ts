// pages/AppPage.ts
import { BasePage } from './BasePage';
import { Locator, Page, expect } from '@playwright/test';

export class AppPage extends BasePage {
  readonly appTab: Locator;
  readonly appDescription: Locator;
  readonly downloadLinkAndroid: Locator;
  readonly downloadLinkIOS: Locator;

  constructor(page: Page) {
    super(page);
    this.appTab = page.locator('a', { hasText: 'Ứng Dụng' });
    this.appDescription = page.locator('.app-description'); // adapt class
    this.downloadLinkAndroid = page.locator('a.download-android'); // adapt
    this.downloadLinkIOS = page.locator('a.download-ios'); // adapt
  }

  async goToAppModule() {
    await this.click(this.appTab);
    await this.page.waitForLoadState('networkidle');
  }

  async expectDescription() {
    await expect(this.appDescription).toBeVisible();
  }

  async downloadAndroidApp() {
    await this.click(this.downloadLinkAndroid);
  }

  async downloadIOSApp() {
    await this.click(this.downloadLinkIOS);
  }

  async getDescriptionText(): Promise<string | null> {
    return this.appDescription.textContent();
  }
}
