import { expect, Locator, Page } from "@playwright/test";

export class BookingHistorySection {
    constructor(private page: Page) { }

    get root() { return this.page.getByRole('heading', { name: 'Lịch sử đặt vé' }); }
    get items() { return this.page.locator('div.MuiGrid-root.MuiGrid-item'); } // 1 booking card

    // tìm theo tên film để test ổn định
    film(movieName: string, cinemaName: string, roomName: string, duration: string, ticketPrice: string): Locator {
        const dur = duration.slice(0, -4);
        const price = ticketPrice.slice(0, -3);

        return this.items
        .filter({ has: this.page.locator(`text=${movieName}`) })
        .filter({ has: this.page.locator(`text=${cinemaName}`) })
        .filter({ has: this.page.locator(`text=${roomName}`) })
        .filter({ has: this.page.locator(`text=${dur}`) })
        .filter({ has: this.page.locator(`text=${price}`) });
    }

    async verifyBookingExists(movieName: string, cinemaName: string, roomName: string, duration: string, ticketPrice: string) {
        const ticketCount = this.film(movieName, cinemaName, roomName, duration, ticketPrice)
        expect(ticketCount).toBe(1);
    }
}
