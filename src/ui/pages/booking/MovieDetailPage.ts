import { Page, Locator, expect } from '@playwright/test';

export class MovieDetailPage {
  constructor(private readonly page: Page) {}

  get poster(): Locator {
    return this.page.locator('[style*="background-image"]');
  }

  get filmTitle(): Locator {
    return this.page.locator('.MuiTypography-root.MuiTypography-h1');
  }

  get releaseDate(): Locator {
    return this.page.locator('.MuiTypography-root.MuiTypography-h4', { hasText: '.' }); // dạng  28.05.2022
  }

  get duration(): Locator {
    return this.page.locator('.MuiTypography-root.MuiTypography-h5', { hasText: 'phút' }); // 120phut/phust tuỳ text
  }

  get watchTrailerBtn(): Locator {
    return this.page.getByRole('button', { name: 'video-button' });
  }

  get buyTicketHeaderBtn(): Locator {
    return this.page.getByText(/Mua vé|Đặt Vé|Mua Vé/i);
  }

  get trailerModal(): Locator {
    return this.page.locator('#trailerModal');
  }
  // ===========================
  // B. Showtime Section
  // ===========================
  get showtimeRoot(): Locator {
    return this.page.locator('.modal-video');
  }

  // get showtimeTitle(): Locator {
  //   return this.showtimeRoot.getByText(/Lịch Chiếu|Showtime/i);
  // }
  // get cinemaTabList(): Locator {
  //   return this.showtimeRoot.locator('.MuiAvatar-img');
  // }

  closeTrailer() {
    return this.page.locator('.modal-video-close-btn').click();
  }

  get cinemaTabs(): Locator {
    return this.showtimeRoot.locator('.MuiAvatar-img'); // mỗi rạp là 1 tab
  }

  hoverPoster() {
    return this.poster.hover();
  }

  tabByName(name: string): Locator {
    return this.cinemaTabs.filter({ hasText: name });
  }

  get activeCinemaTab(): Locator {
    return this.page.locator('[aria-selected="true"]');
  }

  get showtimeItems(): Locator {
    return this.showtimeRoot.locator('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-3');
  }

  get firstShowtimeButton(): Locator {
    return this.showtimeItems.first().locator('a[href*="/purchase"], button'); 
  }

  // ===========================
  // ACTIONS
  // ===========================
  async clickTrailer() {
    await this.watchTrailerBtn.click();
  }

  async openPurchaseFromSection() {
    await this.firstShowtimeButton.click();
  }

  async waitForLoaded() {
    await expect(this.filmTitle).toBeVisible();
    await expect(this.poster).toBeVisible();
  }

  async openRandomShowtime() {
    const showtimeCount = await this.showtimeItems.count();
    const randomIndex = Math.floor(Math.random() * showtimeCount);
    const randomShowtime = this.showtimeItems.nth(randomIndex);
    const showDateTime = await randomShowtime.innerText();
    const showtimeButton = randomShowtime.locator('a[href*="/purchase"], button');
    await showtimeButton.click();
    return {randomIndex, showDateTime};
  }

  async openShowtimeByDateTime(index: number, dateTime: string) {
    const showtime = this.showtimeItems.nth(index);
    const showtimeButton = showtime.locator('a[href*="/purchase"], button');
    const showtimeText = await showtime.innerText();
    if (!showtimeText.includes(dateTime)) {
      throw new Error(`Showtime at index ${index} does not match the expected date/time: ${dateTime}`);
    }
    await showtimeButton.click();
  }
}
