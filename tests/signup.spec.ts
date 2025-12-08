import {expect, test} from '../fixtures/custom-fixtures';
import { randomUUID } from 'crypto';

test.describe('Sign up', () => {

  test('should register a new user with valid data', async ({ page, homePage, signUpPage }) => {
    const id = randomUUID(); 
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const userName = Array.from({ length: 8 }, () =>
    letters[Math.floor(Math.random() * letters.length)]
  ).join('');
    const account = `User ${id.substring(0, 6)}`;
    const email = `user_${id.substring(0, 6)}@example.com`;
    await homePage.navigateTo();

    await homePage.topBarNavigation.navigateSignUpPage();
    await signUpPage.signUp(account, '123456', '123456', userName, email);
    await expect(signUpPage.getLblSignUpMsgLocator()).toBeVisible();
    await expect(page).toHaveURL('/login');
  });

});