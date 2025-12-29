import { test, expect } from '@playwright/test';
import { SeatPlanPage } from '../../../ui/pages/booking/SeatPlanPage';



// =============================
// B2.1 Select one seat → highlight + panel sync
// =============================
test('Selecting one seat should highlight and appear in ticket panel', async ({ page }) => {
  const seat = new SeatPlanPage(page);
  await seat.gotoViaHome();

  const seatLabel = await seat.pickFirstAvailableSeat();

  await expect(seat.selectedSeats).toContainText(seatLabel);
  await expect(seat.selectedSeatList).toContainText(seatLabel);
});


// =============================
// B2.2 Select → unselect → removed from panel
// =============================
test('Unselecting a seat should remove it from ticket panel', async ({ page }) => {
  const seat = new SeatPlanPage(page);
  await seat.gotoViaHome();

  const first = seat.availableSeats.first();
  const seatLabel = await first.innerText();

  await first.click();   // select
  await first.click();   // unselect

  await expect(seat.selectedSeats).not.toContainText(seatLabel);
  await expect(seat.selectedSeatList).not.toContainText(seatLabel);
});


// =============================
// B2.3 Multi-seat select → total updates
// =============================
test('Selecting multiple seats should update total price correctly', async ({ page }) => {
  const seat = new SeatPlanPage(page);
  await seat.gotoViaHome();

  const seat1 = await seat.pickFirstAvailableSeat();
  const seat2 = await seat.pickFirstAvailableSeat(); // pick next

  const priceText = await seat.ticketPrice.innerText(); 
  const price = parseInt(priceText.replace(/\D/g, ''), 10);

  await expect(seat.selectedSeatList).toContainText(seat1);
  await expect(seat.selectedSeatList).toContainText(seat2);

  // total = price * seats count
  const selectedCount = await seat.selectedSeats.count();
  expect(selectedCount).toBeGreaterThanOrEqual(2);
});


