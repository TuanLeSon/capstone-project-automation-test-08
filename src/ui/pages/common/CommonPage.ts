/* =====================================================
src/ui/pages/CommonPage.ts
===================================================== */
import { BasePage } from '../../base/BasePage';
import { TopBarNavigation } from '../../components/TopBarNavigation';


export class CommonPage extends BasePage {
readonly topBar: TopBarNavigation;
constructor(page) { super(page); this.topBar = new TopBarNavigation(page); }
}