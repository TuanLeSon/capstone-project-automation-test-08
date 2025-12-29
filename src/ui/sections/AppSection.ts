import { Page, Locator } from '@playwright/test';

export class AppSection {
  constructor(private readonly page: Page) { }

  get root(): Locator {
    return this.page.locator('#ungDung');
  }

  get imgSlider(): Locator {
    return this.root.getByRole('img', { name: 'slider' });
  }

  get appButtons(): Locator {
    return this.root.locator('a');
  }
}