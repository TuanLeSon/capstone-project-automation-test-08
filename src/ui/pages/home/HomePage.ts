/* =====================================================
src/ui/pages/home/HomePage.ts
===================================================== */
import { CommonPage } from '../common/CommonPage';
import { SearchSection } from '../../sections/SearchSection';
import { BannerSection } from '../../sections/BannerSection';
import { ShowtimeSection } from '../../sections/ShowtimeSection';
import { CinemaClusterSection } from '../../sections/CinemaClusterSection';
import { expect } from '@playwright/test';
import { AppSection } from '../../sections/AppSection';
import { NewsSection } from '../../sections/NewsSection';

export class HomePage extends CommonPage {
    readonly search: SearchSection;
    readonly banner: BannerSection;
    readonly showtime: ShowtimeSection;
    readonly cinemaCluster: CinemaClusterSection;
    readonly appSection: AppSection;
    readonly newsSection: NewsSection;
    constructor(page) { 
        super(page); 
        this.search = new SearchSection(page);
        this.banner = new BannerSection(page);
        this.showtime = new ShowtimeSection(page);
        this.cinemaCluster = new CinemaClusterSection(page);
        this.appSection = new AppSection(page);
        this.newsSection = new NewsSection(page);
    }

    
    async open() {
        await this.smartNavigate('/', '/');
        await this.waitForLoaded();
    }

    async waitForLoaded() {
        await expect(this.topBar.root).toBeVisible();
      }

      get showtimeHeader() {
        return this.page.locator('#lichChieu');
      }

      get cinemaClusterHeader() {
        return this.page.locator('#cumRap');
      }
      
      get newsHeader() {
        return this.page.getByRole('tab', { name: 'Điện Ảnh 24h' });
      }

      get appSectionHeader() {
        return this.page.locator('#ungDung');
      }

}