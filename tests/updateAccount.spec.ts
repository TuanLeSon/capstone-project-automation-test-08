import {expect, test} from '../fixtures/custom-fixtures';
import { randomUUID } from 'crypto';

test.describe('Update Account', () => {
    test.beforeEach(async ({ authenticatedPage }) => {
        console.log('Access account page');
        await authenticatedPage.goto('/account');
    });
  test('should update current user with valid data', async ({ accountPage }) => {
    const id = randomUUID(); 
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const userName = Array.from({ length: 8 }, () =>
    letters[Math.floor(Math.random() * letters.length)]
  ).join('');
    const email = `user_${id.substring(0, 6)}@example.com`;
    const phoneNumber = Array.from({ length: 10 }, () => digits[Math.floor(Math.random() * digits.length)]).join('');
    const password = Array.from({ length: 10 }, () => digits[Math.floor(Math.random() * digits.length)]).join('');

    console.log('Updating account...');
    await accountPage.updateAccount(password, userName, email, phoneNumber);

    console.log('Verifying update message...');
    await expect(accountPage.getLblUpdateMsgLocator()).toBeVisible();

    console.log('Test completed successfully.');
   
  });

});