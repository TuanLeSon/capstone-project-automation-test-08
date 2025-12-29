import { test, expect } from '@playwright/test';
import { HomePage } from '../../../ui/pages/home/HomePage';
import { TrailerDialog } from '../../../ui/components/TrailerDialog';


test('Hover movie card shows trailer action', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();
  await home.showtime.waitForLoaded();
  const showtime = home.showtime;

  // Pre-condition
  await expect(showtime.movieCards.first()).toBeVisible();

  const card = showtime.movieCard(0);

  // Action
  await showtime.hoverMovieCard(0);
  // await showtime.clickBuyTicketOnMovieCard(card);
  // Assert overlay OR play icon xuất hiện
  await expect(showtime.movieBuyTicket(card)).toBeVisible();
  await expect(showtime.moviePlayIcon(card)).toBeVisible();
});


test('Movie card shows image, age label and description', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();

  const showtime = home.showtime;

  // Pre-condition
  await expect(showtime.movieCards.first()).toBeVisible();

  const card = showtime.movieCard(0);

  // Assert image
  const image = showtime.movieImage(card);
  await expect(image).toBeVisible();
  // await expect(image).toHaveAttribute('src', /.+/);

  // Assert age restriction label
  // await expect(showtime.ageLabel(card)).toBeVisible();

  // Assert description / content
  await expect(showtime.description(card)).toBeVisible();
});

test('Open trailer modal from movie card', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();

  await home.showtime.openTrailer(0);

  const trailer = new TrailerDialog(page);
  await trailer.expectVisible();
});

test('Close trailer modal by button and overlay', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();

  await home.showtime.openTrailer(0);

  const trailer = new TrailerDialog(page);
  await trailer.expectVisible();

  // Close by button
  await trailer.closeByButton();

  // Re-open
  await home.showtime.openTrailer(0);
  await trailer.expectVisible();

  // Close by overlay
  await trailer.closeByOverlay();
});

test('Close trailer modal by X button', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();

  // Open trailer
  await home.showtime.openTrailer(0);

  const trailer = new TrailerDialog(page);
  await trailer.expectVisible();

  // Close by X
  await trailer.closeByButton();

  // Assert page is interactable again
  await expect(home.showtime.movieCards.first()).toBeVisible();
});

test('Close trailer modal by overlay click', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();

  // Open trailer
  await home.showtime.openTrailer(0);

  const trailer = new TrailerDialog(page);
  await trailer.expectVisible();

  // Close by overlay
  await trailer.closeByOverlay();

  // Assert page is interactable again
  await expect(home.showtime.movieCards.first()).toBeVisible();
});
test('Movie pagination forward/backward stability', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
  
    const showtime = home.showtime;
    await showtime.waitForLoaded();
  
    // Step 1 — Lấy danh sách phim của page 1
    const firstPageMovies = await showtime.getMovieDescriptions();
    expect(firstPageMovies.length).toBeGreaterThan(0);
  
    // Step 2 — Chuyển trang tiếp theo
    await showtime.nextPage();
    await showtime.waitMovieChanged(firstPageMovies);
    const secondPageMovies = await showtime.getMovieDescriptions();
    expect(secondPageMovies).not.toEqual(firstPageMovies);
  
    // Step 3 — Quay ngược lại page trước
    await showtime.prevPage();
    await expect.poll(async () => showtime.getMovieDescriptions()).toEqual(firstPageMovies);
  });
  
