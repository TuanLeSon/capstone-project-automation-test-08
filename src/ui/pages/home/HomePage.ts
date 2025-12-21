/* =====================================================
src/ui/pages/home/HomePage.ts
===================================================== */
import { CommonPage } from '../common/CommonPage';
import { SearchSection } from '../../sections/SearchSection';
import { BannerSection } from '../../sections/BannerSection';
import { ShowtimeSection } from '../../sections/ShowtimeSection';

export class HomePage extends CommonPage {
    readonly search: SearchSection;
    readonly banner: BannerSection;
    readonly showtime: ShowtimeSection;
    constructor(page) { 
        super(page); 
        this.search = new SearchSection(page);
        this.banner = new BannerSection(page);
        this.showtime = new ShowtimeSection(page);
    }
    async open() {
        await this.smartNavigate('/', '/');

    }
}