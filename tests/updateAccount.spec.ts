import {expect, test} from '../fixtures/custom-fixtures';
import { randomUUID } from 'crypto';
import { TopBarNavigation } from '../pages/components/TopBarNavigation';

test.describe('Update Account', () => {
    test.beforeEach(async ({ authenticatedPage }) => {
        console.log('Before each executed');
    });
  test('should update current user with valid data', async ({ page, homePage, accountPage }) => {
    const id = randomUUID(); 
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const userName = Array.from({ length: 8 }, () =>
    letters[Math.floor(Math.random() * letters.length)]
  ).join('');
    const email = `user_${id.substring(0, 6)}@example.com`;
    const phoneNumber = Array.from({ length: 10 }, () => digits[Math.floor(Math.random() * digits.length)]).join('');
    const password = Array.from({ length: 10 }, () => digits[Math.floor(Math.random() * digits.length)]).join('');
    await homePage.navigateTo();

    await homePage.topBarNavigation.navigateUserProfile();

    await accountPage.updateAccount(password, userName, email, phoneNumber);
    await expect(accountPage.getLblUpdateMsgLocator()).toBeVisible();
   
  });

});