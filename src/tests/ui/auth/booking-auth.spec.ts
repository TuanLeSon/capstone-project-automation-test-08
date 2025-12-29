import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../../ui/pages/home/HomePage';
import { WarningDialog } from '../../../ui/pages/common/WarningDialog';
import { MovieDetailPage } from '../../../ui/pages/booking/MovieDetailPage';
import { SeatPlanPage } from '../../../ui/pages/booking/SeatPlanPage';
import { ShowtimeSection } from '../../../ui/sections/ShowtimeSection';
import { LoginPage } from '../../../ui/pages/auth/LoginPage';
import { WarningMessages } from '../../../shared/constants/WarningMessages';




test('Navigate to seat plan when clicking a showtime (no login required)', async ({ page }) => {
    const home = new HomePage(page);
  
    await home.open();
    await home.showtime.waitForLoaded();
    await home.clickRandomlyFrom(home.showtime.movieCards);
  
    const movie = new MovieDetailPage(page);
    await movie.openPurchaseFromSection();         // Click suất chiếu
  
    const seat = new SeatPlanPage(page);
    await seat.waitForLoaded();                    // seat-map visible
    await expect(seat.btnBook).toBeVisible();
  });

  test('Navigate to seat plan when clicking a showtime in cinema cluster (no login required)', async ({ page }) => {
    const home = new HomePage(page);
  
    await home.open();
    await home.cinemaCluster.waitForLoaded();
    await home.clickRandomlyFrom(home.cinemaCluster.showtimeItems);
  
    const seat = new SeatPlanPage(page);
    await seat.waitForLoaded();                    // seat-map visible
    await expect(seat.btnBook).toBeVisible();
  });
  

  
  test('Booking button without selecting seat should show warning dialog', async ({ page }) => {
    const login = new LoginPage(page);
    const showtime = new ShowtimeSection(page);
  
    await login.open();
    await login.submitLogin('2025111', '123456');
    await showtime.waitForLoaded();
    await showtime.clickRandomMovieBuyTicket();
  
    const movie = new MovieDetailPage(page);
    await movie.openPurchaseFromSection();
  
    const seat = new SeatPlanPage(page);
    await seat.book();                             // Click ĐẶT VÉ
  
    const dialog = new WarningDialog(page);
    await dialog.waitForLoaded();
    await dialog.expectMessage(WarningMessages.NO_SEAT_TITLE, WarningMessages.NO_SEAT_MSG);
  });


  test('Redirect to login when booking without authentication', async ({ page }) => {
    const home = new HomePage(page);
    const showtime = new ShowtimeSection(page);
  
    await home.open();
    await showtime.clickRandomMovieBuyTicket();
  
    const movie = new MovieDetailPage(page);
    await movie.openPurchaseFromSection();
  
    const seat = new SeatPlanPage(page);
    await seat.book();                             // chưa chọn ghế
  
    const dialog = new WarningDialog(page);
    await dialog.waitForLoaded();
    await dialog.expectMessage(WarningMessages.NO_LOGIN_TITLE, WarningMessages.NO_LOGIN_MSG);
    await dialog.approveButton.click();            // Đồng ý
  
    const login = new LoginPage(page);
    await expect(login.email).toBeVisible();        // verify page login
  });
  

  