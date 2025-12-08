import { test as base, FullConfig, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SignUpPage } from '../pages/SignUpPage';
import { AccountPage } from '../pages/AccountPage';

// Declare the types of your fixtures.
type MyFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  signUpPage: SignUpPage;
  accountPage: AccountPage;
  logoutPage: LoginPage;
  authenticatedPage: Page;
};

async function performLogin(page, homePage, username, password) {
  const loginPage = new LoginPage(page);
  console.log('Navigating to homepage...');
  await homePage.navigateTo();
  console.log('Navigating to login page...');
  await homePage.topBarNavigation.navigateLoginPage();
  await page.waitForLoadState('networkidle'); // Ensure the login page is fully loaded
  console.log('Logging in...');
  await loginPage.login(username, password);
  await loginPage.getLblLoginMsgLocator().waitFor({ state: 'visible' });
  console.log('Login complete.');
}

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    // Set up the fixture.
    const homePage = new HomePage(page);

    // Use the fixture value in the test.
    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  signUpPage: async ({ page }, use) => {
    const signupPage = new SignUpPage(page);
    await use(signupPage);
  },

  accountPage: async ({ page }, use) => {
    const accountPage = new AccountPage(page);
    await use(accountPage);
  },

  authenticatedPage: async ({ page, homePage }, use, testInfo) => {
    // Perform login before using the page.
    const creds = testInfo.project.use.httpCredentials;
    const username = process.env.TEST_USERNAME || creds?.username;
    const password = process.env.TEST_PASSWORD || creds?.password;
    try {
      await performLogin(page, homePage, username, password);
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // Fail the test if login fails
    }
    await use(page);
  }
});

export { expect } from '@playwright/test';