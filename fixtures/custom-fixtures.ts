import { test as base, Page } from '@playwright/test';
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
  authenticatedPage: Page;
};

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    // Set up the fixture.
    const homePage = new HomePage(page);

    // Use the fixture value in the test.
    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(new LoginPage(page));
  },

  signUpPage: async ({ page }, use) => {
    const signupPage = new SignUpPage(page);
    await use(new SignUpPage(page));
  },

  accountPage: async ({ page }, use) => {
    const accountPage = new AccountPage(page);
    await use(new AccountPage(page));
  },

  authenticatedPage: async ({ page, homePage }, use) => {
    // Perform login before using the page.
    const loginPage = new LoginPage(page);
    await homePage.navigateTo();
    await homePage.topBarNavigation.navigateLoginPage();
    await loginPage.login('202511', '123456');
    await use(page);
  }
});
export { expect } from '@playwright/test';