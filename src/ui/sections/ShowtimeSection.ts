import { Page, Locator, expect } from '@playwright/test';


export class ShowtimeSection {

    constructor(private readonly page: Page) {}
    get root() { return this.page.locator('#lichChieu'); }
    get movieCards() { 
        return this.root.locator('.MuiGrid-item'); 
    }

  movieCard(index = 0): Locator {
    return this.movieCards.nth(index);
  }

  movieImage(card: Locator): Locator {
    return card.locator('[style*="background-image"]');;
  }

//   ageLabel(card: Locator): Locator {
//     return card.locator('.age, .limit-age, [class*="age"]');
//   }

  description(card: Locator): Locator {
    return card.locator('.MuiTypography-root');
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
    await this.movieBuyTicket(card).click();
  }

  async openTrailer(index = 0) {
    const card = this.movieCard(index);
    await card.hover();
    await expect(this.moviePlayIcon(card)).toBeVisible();
    await this.moviePlayIcon(card).click();
  }
}