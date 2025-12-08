import { log } from 'console';
import {expect, test} from '../fixtures/custom-fixtures';
import { LogoutPage } from '../pages/LogoutPage';

test.describe('Logout', () => {
    test.beforeEach(async ({ authenticatedPage }) => {
      console.log('Login before each executed');
      await authenticatedPage.goto('/',  { waitUntil: 'domcontentloaded' });
        
    });
  test('Click logout then click cancel', async ({ page, homePage }) => {
    const logoutPage = new LogoutPage(page);
    homePage.topBarNavigation.clickLogout();
    await expect(logoutPage.getLogoutDialog()).toBeVisible();
    logoutPage.cancelLogout();
    await expect(logoutPage.getLogoutDialog()).toBeHidden();
    await expect(homePage.topBarNavigation.getBtnLogoutLocator()).toBeVisible();
  });

  test('Logout an account', async ({ page, homePage }) => {
    const logoutPage = new LogoutPage(page);
    homePage.topBarNavigation.clickLogout();
    await expect(logoutPage.getLogoutDialog()).toBeVisible();
    logoutPage.confirmLogout();
    await expect(logoutPage.getLogoutDialog()).toBeHidden();
    await expect(logoutPage.getLblLogoutSuccessMsg()).toBeVisible();
  });

  test('Open Logout dialog then click on overlay', async ({ page, homePage }) => {
    const logoutPage = new LogoutPage(page);
    homePage.topBarNavigation.clickLogout();
    await expect(logoutPage.getLogoutDialog()).toBeVisible();
    await expect(logoutPage.getLogoutOverlay()).toBeVisible();
    logoutPage.clickOutsideDialog();
    await expect(logoutPage.getLogoutDialog()).toBeHidden();
  });
});