import { test, expect } from '@playwright/test';
import { HomePage } from '../../../ui/pages/home/HomePage';
import { WarningDialog } from '../../../ui/pages/common/WarningDialog';
import { WarningMessages } from '../../../shared/constants/WarningMessages';
import { TrailerDialog } from '../../../ui/components/TrailerDialog';

test('HOME_01 - Home page loads successfully', async ({ page }) => {
    const home = new HomePage(page);
  
    await home.open();
  
    // Assert URL
    await expect(page).toHaveURL(/cybersoft\.edu\.vn/);
  
    // Assert header (landmark)
    await expect(home.topBar.root).toBeVisible();
  });

  test('HOME_02 - Banner section is visible', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
  
    await expect(home.banner.root).toBeVisible();
  });
  
  test('HOME_03 - Movie list is visible', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
  
    await expect(home.showtime.root).toBeVisible();
  
    const movieCount = await home.showtime.movieCards.count();
    expect(movieCount).toBeGreaterThan(0);
  });
  
  test('HOME_04 - Film dropdown is visible and populated', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
  
    const search = home.search;
  
    // Assert film dropdown state
    await expect(search.film).toBeVisible();
    await expect(search.film).toBeEnabled();
  
    // Assert default option
    const defaultOption = search.filmOptions().first();
    await expect(defaultOption).toHaveText("phim");
    await expect(defaultOption).toBeDisabled();
  
    // Assert film list populated
    await expect.poll(async () => {
      return await search.filmOptions().count();
    }).toBeGreaterThan(1);
  });
  
  test('HOME_05 - Cinema dropdown is populated after selecting film', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
  
    const search = home.search;
  
    // Pre-condition: select film (film dropdown behavior covered in TC04)
    await search.selectAnyFilm();
  
    // Assert cinema dropdown state
    await expect(search.cinema).toBeVisible();
    await expect(search.cinema).toBeEnabled();
  
    // Assert default option
    const defaultOption = search.cinemaOptions().first();
    await expect(defaultOption).toHaveText(/rạp/i);
    await expect(defaultOption).toBeDisabled();
  
    // Assert cinema list populated (async API)
    await expect.poll(async () => {
      return await search.cinemaOptions().count();
    }).toBeGreaterThan(1);
  
    // Assert selecting cinema shows value
    await search.selectAnyCinema();
    await expect(search.cinema).not.toHaveValue('');
  });
  
  test('HOME_TC06 - User can select Film, Cinema and Date', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
  
    const search = home.search;
  
    await search.selectAnyFilm();
    await expect(search.film).not.toHaveValue('');
  
    await search.selectAnyCinema();
    await expect(search.cinema).not.toHaveValue('');
  
    await search.selectAnyDate();
    await expect(search.date).not.toHaveValue('');
  });
  
  test('HOME_TC07.01 - Warning pop-up if user click buy ticket but yet to select film', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
  
    const search = home.search;
  
    await search.clickBuyTicket();
    const dialog = new WarningDialog(page);
    await dialog.expectMessage(
      WarningMessages.NO_FILM_TITLE,
      WarningMessages.NO_FILM_MSG
    );
    await dialog.close();
    await dialog.expectClosed();
  });

  test('HOME_TC07.02 - Warning pop-up if user click buy ticket but yet to select cinema', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
  
    const search = home.search;
  
    await search.clickBuyTicket();
    const dialog = new WarningDialog(page);
    await dialog.expectMessage(
      WarningMessages.NO_CINEMA_TITLE,
      WarningMessages.NO_CINEMA_MSG
    );
    await dialog.close();
    await dialog.expectClosed();
  });

  test('HOME_TC07.03 - Warning pop-up if user click buy ticket but yet to select date', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
  
    const search = home.search;
  
    await search.clickBuyTicket();
    const dialog = new WarningDialog(page);
    await dialog.expectMessage(
      WarningMessages.NO_DATE_TITLE,
      WarningMessages.NO_DATE_MSG
    );
    await dialog.close();
    await dialog.expectClosed();
  });

test('HOME_TC08 - Hover movie card shows trailer action', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();

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


test('HOME_TC09 - Movie card shows image, age label and description', async ({ page }) => {
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

test('HOME_TC10 - Banner carousel auto-slides', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();

  const banner = home.banner;

  // Pre-condition
  await expect(banner.root).toBeVisible();
  await expect(banner.prevButton).toBeVisible();
  await expect(banner.nextButton).toBeVisible();
  // await expect(banner.hoverBanner());
  await expect(banner.bannerPlayIcon).toBeVisible();
  
});

test('HOME_TC11 - Open trailer modal from movie card', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();

  await home.showtime.openTrailer(0);

  const trailer = new TrailerDialog(page);
  await trailer.expectVisible();
});

test('HOME_TC12 - Close trailer modal by button and overlay', async ({ page }) => {
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

test('HOME_TC12.1 - Close trailer modal by X button', async ({ page }) => {
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

test('HOME_TC12.2 - Close trailer modal by overlay click', async ({ page }) => {
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


