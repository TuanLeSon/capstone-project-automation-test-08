import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../../base/BasePage";
import { HomePage } from "../home/HomePage";
import { MovieDetailPage } from "./MovieDetailPage";
import { time } from "console";

export class SeatPlanPage extends BasePage {
  // lastSelectedSeat: string ='';
  constructor(page: Page) { super(page); }

  /** Full flow đi từ homepage */
  async gotoViaHome(movieIndex = 0) {
    const home = new HomePage(this.page);
    await home.open();

    const showtime = home.showtime;
    await showtime.openFilmDetailByIndex(movieIndex);
    const movie = new MovieDetailPage(this.page);
    await movie.waitForLoaded();
    await movie.openPurchaseFromSection(); // Click suất chiếu bất kỳ
  }

  get unavailableSeats() {
    return this.page.locator('button:disabled');
  }

  // Ghế VIP (2 class jss dynamic → detect bằng class count)
  get vipSeats() {
    return this.page.locator('button.MuiButton-root[class*="jss"]').filter({
      has: this.page.locator('[class*="jss"]') // contain 2 jss layer
    });
  }

  // Ghế còn trống
  get availableSeats() {
    return this.page.locator('button.MuiButton-root:not([disabled])');
  }

  // Ghế đang chọn (style inline background-color: green)
  get selectedSeats() {
    return this.page.locator('button[style*="green"]');
  }

  // seat(label: number | string) {
  //   return this.page.getByRole('button', { name: `${label}` });
  // }

  async pickFirstAvailableSeat() {
    const seat = this.availableSeats.first();
    const seatLabel = await seat.innerText();
    await seat.click();
    await expect(this.selectedSeats).toContainText(seatLabel);
    return seatLabel;
  }

  /* ===================== TICKET SUMMARY ===================== */

  get ticketSummary() {
    return this.page.locator('div.MuiGrid-root.MuiGrid-item'); // container tổng
  }

  get ticketPrice() {
    return this.ticketSummary.getByText(/vnd/i); // "270000VND"
  }

  get cinemaName() {
    return this.ticketSummary.getByText(/cụm rạp/i, { exact: false }).locator('xpath=following-sibling::*[1]');
  }

  get cinemaAddress() {
    return this.ticketSummary.getByText(/địa chỉ/i).locator('xpath=following-sibling::*[1]');
  }

  get roomName() {
    return this.ticketSummary.getByText(/rạp:/i).locator('xpath=following-sibling::*[1]').nth(1);
  }

  get showDateTime() {
    return this.ticketSummary.getByText(/ngày giờ chiếu/i).locator('xpath=following-sibling::*[1]');
  }

  get filmName() {
    return this.ticketSummary.getByText(/tên phim/i).locator('xpath=following-sibling::*[1]');
  }

  get selectedSeatList() {
    return this.ticketSummary.getByText(/chọn/i).locator('xpath=following-sibling::*[1]');
  }

  get btnBook() {
    return this.ticketSummary.getByRole('button', { name: /đặt vé/i });
  }

  async book() {
    await this.btnBook.click();
  }

  // get root(): Locator {
  //   return this.page.locator('.seat-plan'); // placeholder — sửa đúng DOM sau khi confirm
  // }

  get seats(): Locator {
    return this.page.locator('button.MuiButton-root'); // sẽ refine sau
  }

  waitForLoaded(): Promise<void> {
    return expect(this.btnBook).toBeVisible({ timeout: 5000 });
  }
  seat(index: number): Locator {
    return this.seats.nth(index);
  }

  get ticketPanel(): Locator {
    return this.page.locator('.ticket-info'); 
  }

  // --- actions ---
  async selectSeat(index: number) {
    await this.seat(index).click();
  }

  async expectSeatSelected(name: string) {
    await expect(this.selectedSeats).toContainText(name);
  }

  selectedSeat = '';

  async clickRandomlyFromAvailableSeats(seats: Locator) {
    const count = await seats.count();
    const index = Math.floor(Math.random() * count);
    const lastSelectedSeat = await seats.nth(index).textContent(); // lưu số ghế
    await seats.nth(index).click();
    return lastSelectedSeat;
  }

  getSeat(seatLabel: string) {
    return this.seat(parseInt(seatLabel) - 1); // giả sử label ghế là số từ 1-n tương ứng index 0-(n-1)
  }
}
