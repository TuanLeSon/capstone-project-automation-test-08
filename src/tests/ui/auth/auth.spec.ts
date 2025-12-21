import { test, expect } from '@playwright/test';
import { HomePage } from '../../../ui/pages/home/HomePage';
import { generateUser } from '../../../shared/generators/UserGenerator';

test('HOME_01 - Home page loads successfully', async ({ page }) => {
    const home = new HomePage(page);
  
    await home.open();
  
    // Assert URL
    await expect(page).toHaveURL(/cybersoft\.edu\.vn/);
  
    // Assert header (landmark)
    await expect(home.topBar.root).toBeVisible();
  });
  
test('signup -> redirect or topbar shows account', async ({ page }) => {
const home = new HomePage(page);
await home.open();
await home.topBar.goToSignup();
const SignupPage = (await import('../../../ui/pages/auth/SignupPage')).SignupPage;
const signup = new SignupPage(page);
const u = generateUser('ui');
await signup.waitForLoaded();
await signup.submitSignup(u);
const LoginPage = (await import('../../../ui/pages/auth/LoginPage')).LoginPage;
const account = new LoginPage(page);
try { await account.waitForLoaded(); } catch { await expect(home.topBar.account).toBeVisible(); }
});