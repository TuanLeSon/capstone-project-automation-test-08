import { test, expect } from "@playwright/test";
import { HomePage } from "../../../ui/pages/home/HomePage";
import { WarningDialog } from "../../../ui/pages/common/WarningDialog";
import { WarningMessages } from "../../../shared/constants/WarningMessages";

test('Film dropdown is visible and populated', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();
  await home.showtime.waitForLoaded(); // ensure home loaded
  const search = home.search;

  // Assert film dropdown state
  await expect(search.film).toBeVisible();
  await expect(search.film).toBeEnabled();

  // Assert default option
  const defaultOption = search.filmOptions().first();
  await expect(defaultOption).toHaveText("Phim");
  await expect(defaultOption).toBeDisabled();

  // Assert film list populated
  await expect.poll(async () => {
    return await search.filmOptions().count();
  }).toBeGreaterThan(1);
});

test('Cinema dropdown is populated after selecting film', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();
  await home.showtime.waitForLoaded(); // ensure home loaded
  const search = home.search;

  // Pre-condition: select film (film dropdown behavior covered in TC04)
  await search.selectAnyFilm();

  // Assert cinema dropdown state
  await expect(search.cinema).toBeVisible();
  await expect(search.cinema).toBeEnabled();

  // Assert default option
  const defaultOption = search.cinemaOptions().first();
  await expect(defaultOption).toHaveText(/Rạp/i);
  await expect(defaultOption).toBeDisabled();

  // Assert cinema list populated (async API)
  await expect.poll(async () => {
    return await search.cinemaOptions().count();
  }).toBeGreaterThan(1);

  // Assert selecting cinema shows value
  await search.selectAnyCinema();
  await expect(search.cinema).not.toHaveValue('');
});

test('User can select Film, Cinema and Date', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();
  await home.showtime.waitForLoaded(); // ensure home loaded
  const search = home.search;

  await search.selectAnyFilm();
  await expect(search.film).not.toHaveValue('');

  await search.selectAnyCinema();
  await expect(search.cinema).not.toHaveValue('');

  await search.selectAnyDate();
  await expect(search.date).not.toHaveValue('');
});

test('Warning pop-up if user click buy ticket but yet to select film', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();
  await home.showtime.waitForLoaded(); // ensure home loaded
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

test('Warning pop-up if user click buy ticket but yet to select cinema', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();
  await home.showtime.waitForLoaded(); // ensure home loaded
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

test('Warning pop-up if user click buy ticket but yet to select date', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();
  await home.showtime.waitForLoaded(); // ensure home loaded
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

test('Successful search navigates to Movie Detail page', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();
  await home.showtime.waitForLoaded(); // ensure home loaded
  const search = home.search;

  await search.selectAnyFilm();
  await search.selectAnyCinema();
  await search.selectAnyDate();

  await search.clickBuyTicket();

  // Assert navigation to Movie Detail page
  await expect(page).toHaveURL(/\/purchase\/\d+/);
});