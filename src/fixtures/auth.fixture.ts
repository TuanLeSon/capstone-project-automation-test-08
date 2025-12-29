import { test as base } from '@playwright/test';
import { LoginPage } from '../ui/pages/auth/LoginPage';
import { testUser } from '../helpers/testUsers';
import { log } from 'console';
import { WarningDialog } from '../ui/pages/common/WarningDialog';
import { TopBarNavigation } from '../ui/components/TopBarNavigation';


export const test = base.extend<{
  authenticatedPage: any;
}>({
  authenticatedPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    // const popup = new WarningDialog(page);
    const topBar = new TopBarNavigation(page);
    const home = (await import('../ui/pages/home/HomePage')).HomePage;

    await login.open(); // phương thức open trang login
    await login.submitLogin(testUser.account, testUser.password); // mock user
    // await popup.waitForLoaded();
    // await popup.approveButton.click(); // đóng popup nếu có
    await topBar.accountIsVisible(); // chờ phần tử account hiển thị trên topbar

    await use(page); // trả page đã login cho test
  },
});

export const expect = base.expect;
