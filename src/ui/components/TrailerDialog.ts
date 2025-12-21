// src/ui/components/TrailerDialog.ts
import { Page, Locator, expect } from '@playwright/test';

export class TrailerDialog {
  constructor(private readonly page: Page) {}

  get root(): Locator {
    return this.page.locator(
      '[role="dialog"], .MuiDialog-root, .modal'
    );
  }

  get iframe(): Locator {
    return this.root.locator('iframe[src*="youtube"]');
  }

  get closeButton(): Locator {
    return this.root.getByRole('button', { name: 'Close the modal by clicking' });
  }

  async expectVisible() {
    await expect(this.root).toBeVisible();
    await expect(this.iframe).toBeVisible();
  }

  async closeByButton() {
    await this.closeButton.click();
    await expect(this.root).toBeHidden();
  }

  async expectClosed() {
    await expect(this.root).toBeHidden();
  }

  async closeByOverlay() {
    await this.page.mouse.click(10, 10); // click overlay
    await expect(this.root).toBeHidden();
  }
}
