// src/ui/sections/BannerSection.ts
import { Page, Locator } from '@playwright/test';

export class BannerSection {
  constructor(private readonly page: Page) { }

  get root(): Locator {
    return this.page.getByRole('img', { name: 'Img alt' }); // hoặc container carousel thực tế
  }

  get prevButton(): Locator {
    return this.page.getByRole('button', { name: 'Previous' });
  }

  get nextButton(): Locator {
    return this.page.getByRole('button', { name: 'Next' });
  }

  get bannerPlayIcon(): Locator {
    return this.page.getByRole('button', { name: 'video-button' });
  }

  // async hoverBanner() {
  //   await this.prevButton.hover();
  // }

  async clickPlayIcon(card: Locator) {
    await this.bannerPlayIcon.click();
  }
}
