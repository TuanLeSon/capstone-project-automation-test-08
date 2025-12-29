/* =====================================================
src/ui/sections/SearchSection.ts
===================================================== */
import { Page, Locator, expect } from '@playwright/test';

export class SearchSection {
  constructor(private readonly page: Page) { }

  get root(): Locator {
    return this.page.locator('#homeTool'); // search container
  }

  get film(): Locator {
    return this.page.locator('select[name="film"]');
  }

  get cinema(): Locator {
    return this.page.locator('select[name="cinema"]').first();
  }

  get date(): Locator {
    return this.page.locator('select[name="date"]');
  }

  get buyTicketButton(): Locator {
    return this.page.locator('button:has-text("Mua vé ngay")');
  }

  filmOptions(): Locator {
    return this.film.locator('option');
  }

  cinemaOptions(): Locator {
    return this.cinema.locator('option');
  }

  dateOptions(): Locator {
    return this.date.locator('option');
  }

  async selectFilmByIndex(index: number) {
    await this.film.selectOption({ index });
  }

  async selectCinemaByIndex(index: number) {
    await this.cinema.selectOption({ index });
  }

  async selectDateByIndex(index: number) {
    await this.date.selectOption({ index });
  }

  async selectAnyFilm() {
    await this.film.scrollIntoViewIfNeeded();
    await this.film.hover();
    await this.film.click();
    await expect.poll(async () => {
      // console.log(await this.filmOptions().count());
      return await this.filmOptions().count();
    }).toBeGreaterThan(1);

    const options = this.filmOptions(); // Locator list <option>
    const count = await options.count();

    if (count === 0) throw new Error("No film options available!");

    const index = Math.floor(Math.random() * count);
    const value = await options.nth(index).getAttribute('value');
    await this.film.selectOption(value!);
  }

  async selectAnyCinema() {
    // await this.cinema.scrollIntoViewIfNeeded();
    await this.cinema.hover();
    await this.cinema.click();
    await expect.poll(async () => {
      return await this.cinemaOptions().count();
    }).toBeGreaterThan(1);

    const value = await this.cinemaOptions().nth(1).getAttribute('value');
    await this.cinema.selectOption(value!);
  }

  async selectAnyDate() {
    await this.date.scrollIntoViewIfNeeded();
    await this.date.hover();
    await this.date.click();

    const options = this.dateOptions();
    await expect.poll(async () => await options.count()).toBeGreaterThan(1);

    const value = await options.nth(1).getAttribute('value');
    await this.date.selectOption(value!);
  }

  async clickBuyTicket() {
    await this.buyTicketButton.click();
  }

}
