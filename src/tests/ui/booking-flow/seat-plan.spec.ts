
import { SeatPlanPage } from "../../../ui/pages/booking/SeatPlanPage";
import { WarningDialog } from "../../../ui/pages/common/WarningDialog";
import { WarningMessages } from "../../../shared/constants/WarningMessages";
import { LoginPage } from "../../../ui/pages/auth/LoginPage";
import { testUser } from "../../../helpers/testUsers";
import { AccountPage } from "../../../ui/pages/auth/AccountPage";
import { HomePage } from "../../../ui/pages/home/HomePage";
import { MovieDetailPage } from "../../../ui/pages/booking/MovieDetailPage";
import test, { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.showtime.waitForLoaded();
    await home.clickRandomlyFrom(home.showtime.movieCards);

    const movie = new MovieDetailPage(page);
    await movie.openRandomShowtime();

    const seat = new SeatPlanPage(page);
    await seat.waitForLoaded();
});


test('Ticket section sync after seat selected', async ({ page }) => {
    const seat = new SeatPlanPage(page);
  
    const chosen = await seat.pickAvailableSeat(1);
    await expect(seat.selectedSeatList).toContainText(chosen);
    await expect(seat.ticketPrice).not.toHaveText('0VND');
  });

  test('Booking requires login', async ({ page }) => {
    const seat = new SeatPlanPage(page);
  
    await seat.pickAvailableSeat(2);
    await seat.book();
    const dialog = new WarningDialog(page);
    await dialog.waitForLoaded();
    await dialog.expectMessage(
      WarningMessages.NO_LOGIN_TITLE,
      WarningMessages.NO_LOGIN_MSG
    );
    await dialog.approveButton.click();
    await expect(page).toHaveURL(/sign-in/);
  });

  test('Complete booking & verify in account', async ({ page }) => {
    const seat = new SeatPlanPage(page);

    await seat.book();
    const dialog = new WarningDialog(page);
    await dialog.approveButton.click();
    await expect(page).toHaveURL(/sign-in/);
  });

  test('Login then return to seat-plan', async ({ page }) => {
    const seat = new SeatPlanPage(page);

    await seat.book();
    const dialog = new WarningDialog(page);
    await dialog.approveButton.click();
    const login = new LoginPage(page);
    await login.waitForLoaded();
    await login.submitLogin(testUser.account, testUser.password);
    await expect(page).toHaveURL(/purchase/);
  });

test('Waring dialog should be hidden when click Login page', async ({ page }) => {
    const home = new HomePage(page);
    home.open();
    await home.showtime.clickRandomMovieBuyTicket();
    const detail = new MovieDetailPage(page);
    await detail.openRandomShowtime();
    const seat = new SeatPlanPage(page);
    seat.clickRandomlyFromAvailableSeats(seat.availableSeats);
    seat.book();
    const dialog = new WarningDialog(page);
    await dialog.waitForLoaded();
    await home.topBar.goToLogin();
    await expect(dialog.root).toBeHidden();
    });

    test('Popup when booking without selecting seat', async ({ page }) => {
        const login = new LoginPage(page);
        await login.open();
        await login.waitForLoaded();
        await login.submitLogin(testUser.account, testUser.password);
        const home = new HomePage(page);
        await home.showtime.waitForLoaded();
        await home.showtime.clickRandomMovieBuyTicket();
        const detail = new MovieDetailPage(page);
        await detail.openRandomShowtime();
        const seat = new SeatPlanPage(page);
        await seat.book();
        const dialog = new WarningDialog(page);
        await dialog.waitForLoaded();
        await dialog.expectMessage(
          WarningMessages.NO_SEAT_TITLE,
          WarningMessages.NO_SEAT_MSG
        );
      });