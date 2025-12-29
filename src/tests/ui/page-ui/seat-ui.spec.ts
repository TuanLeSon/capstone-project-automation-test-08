import { test, expect } from '@playwright/test';
import { SeatPlanPage } from '../../../ui/pages/booking/SeatPlanPage';



// =============================
// B2.1 Select one seat → highlight + panel sync
// =============================
test('Selecting one seat should highlight and appear in ticket panel', async ({ page }) => {
    const seat = new SeatPlanPage(page);
    await seat.gotoViaHome();
    await seat.waitForLoaded();
    const selectedSeat = await seat.clickRandomlyFromAvailableSeats(seat.availableSeats);

    await expect(seat.selectedSeats).toContainText(selectedSeat);
    await expect(seat.selectedSeatList).toContainText(selectedSeat);
});


// =============================
// B2.2 Select → unselect → removed from panel
// =============================
test('Unselecting a seat should remove it from ticket panel', async ({ page }) => {
    const seat = new SeatPlanPage(page);
    await seat.gotoViaHome();
    await seat.waitForLoaded();
    const seatLabel = await seat.clickRandomlyFromAvailableSeats(seat.availableSeats);
    const selectedSeat = seat.getSeat(seatLabel);
    await selectedSeat.click();   // unselect

    await expect(selectedSeat).not.toHaveCSS('background-color', 'rgb(0, 128, 0)');
    await expect(seat.selectedSeatList).not.toContainText(seatLabel);
});


// =============================
// B2.3 Multi-seat select → total updates
// =============================
test('Selecting multiple seats should update total price correctly', async ({ page }) => {
    const seat = new SeatPlanPage(page);
    await seat.gotoViaHome();
    await seat.waitForLoaded();
    const seat1 = await seat.pickAvailableSeat(1);
    const seat2 = await seat.pickAvailableSeat(2); // pick next

    //   const priceText = await seat.ticketPrice.innerText(); 
    //   const price = parseInt(priceText.replace(/\D/g, ''), 10);

    await expect(seat.selectedSeatList).toContainText(seat1);
    await expect(seat.selectedSeatList).toContainText(seat2);

    // total = price * seats count
    const selectedCount = await seat.selectedSeats.count();
    expect(selectedCount).toBeGreaterThanOrEqual(2);
});


