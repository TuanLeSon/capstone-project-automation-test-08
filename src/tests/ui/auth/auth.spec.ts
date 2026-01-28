import { test, expect } from '@playwright/test';
import { HomePage } from '../../../ui/pages/home/HomePage';
import { generateUser } from '../../../shared/generators/UserGenerator';
// import { LoginPage } from '../../../ui/pages/auth/LoginPage';
import { WarningDialog } from '../../../ui/pages/common/WarningDialog';
import { testUser } from '../../../helpers/testUsers';
import { WarningMessages } from '../../../shared/constants/WarningMessages';

test('login -> redirect or topbar shows account', async ({ page }) => {
  const home = new HomePage(page);
  // const popup = new WarningDialog(page);
  await home.open();
  await home.topBar.goToLogin();
  const LoginPage = (await import('../../../ui/pages/auth/LoginPage')).LoginPage;
  const login = new LoginPage(page);
  // const u = generateUser('ui');
  await login.waitForLoaded();
  await login.submitLogin(testUser.account, testUser.password);
  await home.waitForLoaded();
  await expect(home.topBar.account).toBeVisible();
});

test('signup -> redirect or topbar shows account', async ({ page }) => {
  const home = new HomePage(page);
  const popup = new WarningDialog(page);
  await home.open();
  await home.topBar.goToSignup();
  const SignupPage = (await import('../../../ui/pages/auth/SignupPage')).SignupPage;
  const signup = new SignupPage(page);
  const u = generateUser('ui');
  await signup.waitForLoaded();
  await signup.submitSignup(u);
  const LoginPage = (await import('../../../ui/pages/auth/LoginPage')).LoginPage;
  const account = new LoginPage(page);
  await popup.waitForLoaded();
  await popup.approveButton.click();
  try { await account.waitForLoaded(); } catch { await expect(home.topBar.account).toBeVisible(); }
});

test('signout -> redirect to home and topbar shows login', async ({ page }) => {
  const home = new HomePage(page);
  const popup = new WarningDialog(page);

  // const popup = new WarningDialog(page);
  await home.open();
  await home.topBar.goToLogin();
  const LoginPage = (await import('../../../ui/pages/auth/LoginPage')).LoginPage;
  const login = new LoginPage(page);
  // const u = generateUser('ui');
  await login.waitForLoaded();
  await login.submitLogin(testUser.account, testUser.password);

  await expect(home.topBar.account).toBeVisible();
  await home.topBar.logoutUser();
  await expect(popup.title).toHaveText(WarningMessages.LOGOUT_CONFIRM_MSG);
  await popup.approveButton.click();
  await home.waitForLoaded();
  await expect(home.topBar.login).toBeVisible();
});

test ('sign up check film history', async ({ page }) => {
  const home = new HomePage(page);
  const popup = new WarningDialog(page);
  await home.open();
  await home.topBar.goToSignup();
  const SignupPage = (await import('../../../ui/pages/auth/SignupPage')).SignupPage;
  const signup = new SignupPage(page);
  const u = generateUser('ui');
  await signup.waitForLoaded();
  await signup.submitSignup(u);
  const LoginPage = (await import('../../../ui/pages/auth/LoginPage')).LoginPage;
  const account = new LoginPage(page);
  await popup.waitForLoaded();
  // await popup.approveButton.click();
  try { await account.waitForLoaded(); } catch { await expect(home.topBar.account).toBeVisible(); }

  await home.topBar.goToAccount();
  const AccountPage = (await import('../../../ui/pages/auth/AccountPage')).AccountPage;
  const accountPage = new AccountPage(page);
  await accountPage.waitForLoaded();
  await expect(accountPage.getNumberOfBookings()).toBe(0);
});