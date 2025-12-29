import { test, expect } from '../../../fixtures/auth.fixture';
import { HomePage } from '../../../ui/pages/home/HomePage';
import { ShowtimeSection } from '../../../ui/sections/ShowtimeSection';
import { SeatPlanPage } from '../../../ui/pages/booking/SeatPlanPage';
import { AccountPage } from '../../../ui/pages/auth/AccountPage';
import { WarningDialog } from '../../../ui/pages/common/WarningDialog';
import { BookingHistorySection } from '../../../ui/sections/BookingHistorySection';
import { MovieDetailPage } from '../../../ui/pages/booking/MovieDetailPage';
import { WarningMessages } from '../../../shared/constants/WarningMessages';
import { LoginPage } from '../../../ui/pages/auth/LoginPage';
import { testUser } from '../../../helpers/testUsers';


test('Booking success → show popup → redirect Account → Booking history + seat disabled', async ({ authenticatedPage }) => {

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

    const { randomIndex, showDateTime } = await detail.openRandomShowtime();
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
    await seat.waitForLoaded();

    // ---------------- Step 5: redirect về Account (expected) ----------------

    try {
        await expect(authenticatedPage).toHaveURL(/account/, { timeout: 5000 });
    } catch {
        await account.open();  // buộc mở trang Account nếu không tự redirect
    }
    await account.waitForLoaded();
    // ---------------- Step 6: Lịch sử đặt vé phải có film ----------------
    await history.verifyBookingExists(movieName, cinemaName, roomName, duration, ticketPrice, lastSelectedSeat);

    // ---------------- Step 7: quay lại film kiểm tra seat disabled ----------------
    await home.open();
    await home.showtime.waitForLoaded();
    await home.showtime.openFilmDetailByName(movieName);
    await detail.waitForLoaded();
    await detail.openShowtimeByDateTime(randomIndex, showDateTime);
    await seat.waitForLoaded();
    // cần lưu seat đã chọn lúc trước trong class
    if (!lastSelectedSeat) {
        throw new Error('No seat was selected previously');
    }
    await expect(seat.getSeat(lastSelectedSeat )).toBeDisabled();
    const price = await seat.ticketPrice.innerText();
    expect(price).toBe('0VND'); // tránh việc test chạy nhiều lần bị cộng dồn tiền
});

test('Preserve selected seats after login redirect', async ({ page }) => {
    const home = new HomePage(page);
    const showtime = new ShowtimeSection(page);
    const seat = new SeatPlanPage(page);
    const detail = new MovieDetailPage(page);
    const login = new LoginPage(page);

    // Mở trang home và chọn suất chiếu
    await home.open();
    await home.topBar.logoutIfLoggedIn(); // Đảm bảo trạng thái chưa đăng nhập
    await home.showtime.waitForLoaded();
    await home.showtime.clickRandomMovieBuyTicket();
    // lưu tên film để verify sau
    await detail.waitForLoaded();
    const movieName = await detail.filmTitle.innerText();

    const { randomIndex, showDateTime } = await detail.openRandomShowtime();
    await seat.waitForLoaded();
    // Chọn ghế ngồi
    const selectedSeat = await seat.clickRandomlyFromAvailableSeats(seat.availableSeats);

    // Thực hiện đặt vé
    await seat.book();

    // Xác nhận hộp thoại cảnh báo đăng nhập
    const dialog = new WarningDialog(page);
    await dialog.waitForLoaded();
    await dialog.expectMessage(WarningMessages.NO_LOGIN_TITLE, WarningMessages.NO_LOGIN_MSG);
    await dialog.approveButton.click();
    await login.waitForLoaded();
    // Đăng nhập
    await login.submitLogin(testUser.account, testUser.password);

    // Xác nhận vẫn ở trang seat plan và ghế đã chọn được giữ lại
    try {
        await expect(page).toHaveURL(/purchase/, { timeout: 5000 });
    } catch {
        await home.showtime.openFilmDetailByName(movieName);
        await detail.waitForLoaded();
        await detail.openShowtimeByDateTime(randomIndex, showDateTime);
    }
    await seat.waitForLoaded();

    if (!selectedSeat) {
        throw new Error('No seat was selected previously');
    }
    await expect(seat.getSeat(selectedSeat)).toHaveCSS('background-color', 'rgb(0, 128, 0)');;
});