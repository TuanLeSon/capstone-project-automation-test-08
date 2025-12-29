import { test, expect } from '@playwright/test';
import { HomePage } from '../../../ui/pages/home/HomePage';
import { MovieDetailPage } from '../../../ui/pages/booking/MovieDetailPage';
import { TrailerDialog } from '../../../ui/components/TrailerDialog';
import { SeatPlanPage } from '../../../ui/pages/booking/SeatPlanPage';

test.describe('UI - Movie Detail Page', () => {

    test.beforeEach(async ({ page }) => {
        const home = new HomePage(page);
        await home.open();
        await home.showtime.clickRandomMovieBuyTicket(); // Mở trang chi tiết phim đầu tiên
    });

    test('Film detail UI visibility', async ({ page }) => {
        const detail = new MovieDetailPage(page);
        // await detail.openAny();
        await expect(detail.poster).toBeVisible();
        await expect(detail.watchTrailerBtn).toBeVisible();
        await expect(detail.showtimeItems.first()).toBeVisible();
      });
      
    test('Display movie detail header', async ({ page }) => {
        const movie = new MovieDetailPage(page);

        await movie.waitForLoaded();
        await expect(movie.filmTitle).toHaveText(/./);
        await expect(movie.releaseDate).toBeVisible();
        await expect(movie.duration).toBeVisible();
    });

    test('Open trailer to see youtube iframe', async ({ page }) => {
        const movie = new MovieDetailPage(page);
        const trailer = new TrailerDialog(page);
        await movie.hoverPoster();
        await movie.clickTrailer();
        await trailer.expectVisible();
        await trailer.closeByButton();
        await trailer.expectClosed();
    });

    test('Movie detail page contains cinema cluster & showtime', async ({ page }) => {
        const movie = new MovieDetailPage(page);

        await expect(movie.showtimeRoot).toBeVisible();
        // await expect(movie.showtimeTitle).toBeVisible();
        const movieTabsCount = await movie.cinemaTabs.count();
        expect(movieTabsCount).toBeGreaterThan(0);; // có ít nhất 1 rạp
        await movie.cinemaTabs.first().click();
        const showtimeCount = await movie.showtimeItems.count();
        await expect(movie.activeCinemaTab).toBeVisible();
        expect(showtimeCount).toBeGreaterThan(0);;
    });

});
