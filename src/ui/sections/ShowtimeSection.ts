import { Page, Locator, expect } from '@playwright/test';


export class ShowtimeSection {

  constructor(private readonly page: Page) { }
  get root() { return this.page.locator('#lichChieu'); }
  get movieCards() {
    return this.root.locator('.MuiGrid-item');
  }

  movieCard(index = 0): Locator {
    return this.movieCards.nth(index);
  }

  movieImage(card: Locator): Locator {
    return card.locator('[style*="background-image"]');
  }

  async movieName(card: Locator): Promise<string> {
    const cardText = await card.innerText();
    const firstLine = cardText.split('\n')[0];       // lấy dòng đầu tiên
  return firstLine.slice(3).trim();  
  }
  

  async getMovieDescriptions() {
    return this.movieCards.locator('h4.MuiTypography-root').allInnerTexts();
  }

  // Pagination icon
  get nextBtn() { return this.root.locator('.MuiSvgIcon-root').nth(1); }
  get prevBtn() { return this.root.locator('.MuiSvgIcon-root').nth(0); }

  async nextPage() { await this.nextBtn.click(); }
  async prevPage() { await this.prevBtn.click(); }

  async waitMovieChanged(prev: string[]) {
    await expect.poll(async () => await this.getMovieDescriptions())
      .not.toEqual(prev);
  }

  description(card: Locator): Locator {
    return card.locator('h4.MuiTypography-root');
  }


  movieBuyTicket(card: Locator): Locator {
    return card.getByRole('link', { name: 'MUA VÉ', exact: true });
  }

  moviePlayIcon(card: Locator): Locator {
    return card.getByRole('button', { name: 'video-button' });
  }

  async hoverMovieCard(index = 0) {
    await this.movieCard(index).hover();
  }

  async clickBuyTicketOnMovieCard(card: Locator) {
    await card.hover();
    await expect(this.movieBuyTicket(card).first()).toBeVisible();
    await this.movieBuyTicket(card).first().click();
  }

  async openTrailer(index = 0) {
    const card = this.movieCard(index);
    await card.hover();
    await expect(this.moviePlayIcon(card)).toBeVisible();
    await this.moviePlayIcon(card).click();
  }

  async waitForLoaded() {
    await expect(this.root).toBeVisible({ timeout: 10000 });
    await expect(this.movieCards.first()).toBeVisible();
  }

  async openFilmDetailByIndex(index: number) {
    const film = this.movieCards.nth(index);
    // const filmName = await film.locator('.film-title').innerText(); 
    await film.click();
    // return filmName;
  }

  async openFilmDetailByName(name: string) {
    const film = this.movieCards.filter({ hasText: name }).first();
    await film.click();
  }

  async getRandomMovieCard(): Promise<Locator> {
    const count = await this.movieCards.filter({ has: this.page.locator(':visible') }).count();
    // console.log(`Total movie cards: ${count}`);
    const randomIndex = Math.floor(Math.random() * count);
    return this.movieCards.nth(randomIndex - 1);
  }

  async clickRandomMovieBuyTicket() {
    const card = await this.getRandomMovieCard();
    const filmName = await this.movieName(card);
    await this.clickBuyTicketOnMovieCard(card);
    return filmName;
  }
  

}