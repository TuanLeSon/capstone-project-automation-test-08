import test, { Page, Locator, expect } from '@playwright/test';
import { HomePage } from '../../../ui/pages/home/HomePage';
import { SeatPlanPage } from '../../../ui/pages/booking/SeatPlanPage';
import { MovieDetailPage } from '../../../ui/pages/booking/MovieDetailPage';
import { TrailerDialog } from '../../../ui/components/TrailerDialog';
test.describe('Booking & Seat Plan Flow', () => {
test('Open film detail via homepage showtime section', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    const detail = new MovieDetailPage(page);
    const filmName = await home.showtime.clickRandomMovieBuyTicket();
    await expect(detail.filmTitle).toContainText(filmName);
  });

  test('Trailer modal open/close', async ({ page }) => {
    const detail = new MovieDetailPage(page);

    // await detail.openAny();
    await detail.clickTrailer();
    const trailer = new TrailerDialog(page);
    await expect(trailer.iframe).toBeVisible();
  
    await trailer.closeButton.click();
    await expect(trailer.iframe).toBeHidden();
  });
  
  test('Select showtime -> redirect to seat-plan', async ({ page }) => {
    const detail = new MovieDetailPage(page);
  
    await detail.openRandomShowtime();
  
    await expect(page).toHaveURL(/purchase/);
  });
  
  test('Seat types rendered properly', async ({ page }) => {
    const seat = new SeatPlanPage(page);
    await expect(seat.availableSeats.first()).toBeVisible();
  });
});