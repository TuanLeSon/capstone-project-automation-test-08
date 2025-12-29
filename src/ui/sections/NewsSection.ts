
// ui/pages/components/home/NewsSection.ts
import { Page, Locator, expect } from '@playwright/test';

export class NewsSection {
  constructor(private readonly page: Page) { }

  /** toàn bộ tabpanel news (simple-tabpanel-0/1/2) */
  panel(index: number): Locator {
    return this.page.locator(`#simple-tabpanel-${index}`);
  }

  /** news-card nằm trong mỗi panel */
  newsCards(index: number): Locator {
    return this.panel(index).locator('.MuiGrid-root.MuiGrid-item');
  }

  // Element trong card
  cardImage(index: number): Locator {
    return this.newsCards(index).locator('img');
  }

  cardTitles(index: number): Locator {
    return this.newsCards(index).locator('a'); // title link thường là <a>
  }

  /** toggle button XEM THÊM / RÚT GỌN */
  toggleBtn(): Locator {
    return this.page.locator('button', { hasText: /XEM THÊM|RÚT GỌN/i });
  }

  /** actions */
  async expand() {
    const btn = this.toggleBtn();
    await expect(btn).toBeVisible();
    await btn.click();
    await expect.poll(async () => {
      return await btn.innerText();
    }).toMatch(/RÚT GỌN/i);
  }

  async collapse(index: number) {
    const btn = this.toggleBtn();
    await expect(btn).toBeVisible();
    await btn.click();
    await expect(btn).toHaveText(/XEM THÊM/i);
  }

  async getCardCount(index: number): Promise<number> {
    return this.newsCards(index).count();
  }

  async waitForLoaded() {
    await expect(this.toggleBtn()).toBeVisible();
  }

  get newsTabList(): Locator {
    return this.page.locator('.MuiTabs-flexContainer.MuiTabs-centered[role="tablist"]');
  }

  get tabs() {
    return this.newsTabList.locator('[role="tab"]');
  }

  async switchPanel(index: number) {
    await this.tabs.nth(index).click();
    await expect.poll(async () => {
      return await this.tabs.nth(index).getAttribute('aria-selected');
    }).toBe('true');
  }
}

