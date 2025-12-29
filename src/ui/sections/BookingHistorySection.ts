import { expect, Locator, Page } from "@playwright/test";

export class BookingHistorySection {
    constructor(private page: Page) { }

    get root() { return this.page.getByRole('heading', { name: 'Lịch sử đặt vé' }); }
    get items() { return this.page.locator('div.MuiGrid-root.MuiGrid-item'); } // 1 booking card

    // tìm theo tên film để test ổn định
    film(movieName: string, cinemaName: string, roomName: string, duration: string, ticketPrice: string, seatNo: string): Locator {
        const dur = duration.slice(0, -4);
        const price = ticketPrice.slice(0, -3);
    
        return this.items.filter({
            has: this.page.getByText(movieName)
        }).filter({
            has: this.page.getByText(cinemaName)
        }).filter({
            has: this.page.getByText(roomName)
        }).filter({
            has: this.page.getByText(dur)
        }).filter({
            has: this.page.getByText(price)
        }).filter({
            has: this.page.getByText(seatNo)
        })
        ;
    }

    async verifyBookingExists(movieName: string, cinemaName: string, roomName: string, duration: string, ticketPrice: string, seatNo: string) {
        const ticketCount = await this.film(movieName, cinemaName, roomName, duration, ticketPrice, seatNo).count();
        expect(ticketCount).toBe(1);
    }
}
