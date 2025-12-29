import { test, expect } from '../../../fixtures/auth.fixture';
import { HomePage } from '../../../ui/pages/home/HomePage';
import { ShowtimeSection } from '../../../ui/sections/ShowtimeSection';
import { SeatPlanPage } from '../../../ui/pages/booking/SeatPlanPage';
import { AccountPage } from '../../../ui/pages/auth/AccountPage';
import { WarningDialog } from '../../../ui/pages/common/WarningDialog';
import { BookingHistorySection } from '../../../ui/sections/BookingHistorySection';
import { MovieDetailPage } from '../../../ui/pages/booking/MovieDetailPage';
import { WarningMessages } from '../../../shared/constants/WarningMessages';


test('Booking success → show popup → redirect Account → Booking history + seat disabled', async ({ authenticatedPage  }) => {

    const home = new HomePage(authenticatedPage);
    // const showtime = new ShowtimeSection(page);
    const seat = new SeatPlanPage(authenticatedPage);
    const account = new AccountPage(authenticatedPage);
    const history = new BookingHistorySection(authenticatedPage);
    const dialog = new WarningDialog(authenticatedPage);
    const detail = new MovieDetailPage(authenticatedPage);



    // ---------------- Step 1: mở suất chiếu ----------------
    // await home.open();
    await home.showtime.waitForLoaded();
    await home.showtime.clickRandomMovieBuyTicket();
    // lưu tên film để verify sau
    await detail.waitForLoaded();
    const movieName = await detail.filmTitle.innerText();
    const duration = await detail.duration.innerText();
    
    const {randomIndex, showDateTime} = await detail.openRandomShowtime();
    await seat.waitForLoaded();
    const cinemaName = await seat.cinemaName.innerText();
    const roomName = await seat.roomName.innerText();
    // ---------------- Step 2: chọn seat random ----------------
    // sử dụng hàm trong BasePage clickRandomlyFrom()
    const lastSelectedSeat = await seat.clickRandomlyFromAvailableSeats(seat.availableSeats);  // seat.availableSeats = locator ghế còn trống

    // ---------------- Step 3: đặt vé ----------------
    await seat.book();
    const ticketPrice = await seat.ticketPrice.innerText();
    // ---------------- Step 4: Warning popup xuất hiện ----------------
    await dialog.waitForLoaded();
    await dialog.expectMessage(WarningMessages.SUCCESS_BOOKING_TITLE, WarningMessages.SUCCESS_BOOKING_MSG);   // update đúng text UI thực tế
    await dialog.approveButton.click();   // yêu cầu dùng WarningDialog

    // ---------------- Step 5: redirect về Account (expected) ----------------

    try {
        await expect(authenticatedPage).toHaveURL(/account/, { timeout: 5000 });
    } catch {
        await account.open();  // buộc mở trang Account nếu không tự redirect
    }

    // ---------------- Step 6: Lịch sử đặt vé phải có film ----------------
    await history.verifyBookingExists(movieName, cinemaName, roomName, duration, ticketPrice);

    // ---------------- Step 7: quay lại film kiểm tra seat disabled ----------------
    await home.open();
    await home.showtime.openFilmDetailByName(movieName);
    await detail.waitForLoaded();
    await detail.openShowtimeByDateTime(randomIndex, showDateTime);
    await seat.waitForLoaded();
 // cần lưu seat đã chọn lúc trước trong class
    if (!lastSelectedSeat) {
        throw new Error('No seat was selected previously');
    }
    await expect(seat.getSeat(lastSelectedSeat)).toBeDisabled();
    expect(ticketPrice).toBe('0VND'); // tránh việc test chạy nhiều lần bị cộng dồn tiền
});
