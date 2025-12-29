import {test, expect } from "@playwright/test";
import { SeatPlanPage } from "../../../ui/pages/booking/SeatPlanPage";
import { WarningDialog } from "../../../ui/pages/common/WarningDialog";
import { WarningMessages } from "../../../shared/constants/WarningMessages";
import { LoginPage } from "../../../ui/pages/auth/LoginPage";
import { testUser } from "../../../helpers/testUsers";
import { AccountPage } from "../../../ui/pages/auth/AccountPage";

test('Seat Plan - Booking Flow', async () => {
test('Ticket section sync after seat selected', async ({ page }) => {
    const seat = new SeatPlanPage(page);
  
    const chosen = await seat.pickFirstAvailableSeat();
    await expect(seat.selectedSeatList).toContainText(chosen);
    await expect(seat.ticketPrice).not.toBeEmpty();
  });

  test('Popup when booking without select seat', async ({ page }) => {
    const seat = new SeatPlanPage(page);
    await seat.book();
    const dialog = new WarningDialog(page);
    await dialog.expectMessage(
      WarningMessages.NO_SEAT_TITLE,
      WarningMessages.NO_SEAT_MSG
    );
  });

  test('Booking requires login', async ({ page }) => {
    const seat = new SeatPlanPage(page);
  
    await seat.pickFirstAvailableSeat();
    await seat.book();
    const dialog = new WarningDialog(page);
    await dialog.expectMessage(
      WarningMessages.NO_LOGIN_TITLE,
      WarningMessages.NO_LOGIN_MSG
    );
    await dialog.approveButton.click();
    await expect(page).toHaveURL(/login/);
  });
  
  test('TC25.9 - Login then return to seat-plan', async ({ page }) => {
    const login = new LoginPage(page);
  
    await login.submitLogin(testUser.account, testUser.password);
    await expect(page).toHaveURL(/purchase/);
  });

  test('TC25.10 - Complete booking & verify in account', async ({ page }) => {
    const seat = new SeatPlanPage(page);
    const account = new AccountPage(page);
  
    const seatNo = await seat.pickFirstAvailableSeat();
    await seat.book();
  
    await expect(account.ticketHistory).toContainText(seatNo);
  });
});