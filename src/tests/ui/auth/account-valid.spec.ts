import { test, expect } from '@playwright/test';
import { login } from '../../../helpers/authHelper';
; // nếu chưa có thì đổi thành manual login
import { AccountPage } from '../../../ui/pages/auth/AccountPage';
import { WarningMessages } from '../../../shared/constants/WarningMessages';

test.describe('Account Page - Field Validation', () => {

  test.beforeEach(async ({ page }) => {
    await login(page);                   // login để vào account page
    const account = new AccountPage(page);
    await account.open();
  });

  // ---------------------- USERNAME VALIDATION ----------------------
  test('Username cannot be changed', async ({ page }) => {
    const account = new AccountPage(page);
    const username = await account.username.innerText();
    await account.username.fill('');
    await account.update.click();

    expect(account.username).toHaveText(username); // giữ nguyên username cũ
      
  });

  test('Username cannot contain numbers', async ({ page }) => {
    const account = new AccountPage(page);

    await account.fullName.fill('John123');
    await account.update.click();

    await expect(account.fullnameValidationMsg)
      .toHaveText(/không chứa số/i);
  });

  // ---------------------- PASSWORD VALIDATION ----------------------
  test('Password cannot be empty', async ({ page }) => {
    const account = new AccountPage(page);

    await account.password.fill('');
    await account.update.click();

    await expect(account.passwordValidationMsg)
      .toHaveText(WarningMessages.MANDATORY_MSG);
  });

  test('Password must be at least 6 chars', async ({ page }) => {
    const account = new AccountPage(page);

    await account.password.fill('123');
    await account.update.click();

    await expect(account.passwordValidationMsg)
      .toHaveText(WarningMessages.PASSWORD_LENGTH_MSG);
  });

  // ---------------------- EMAIL VALIDATION ----------------------
  test('Email cannot be empty', async ({ page }) => {
    const account = new AccountPage(page);
    await account.email.fill('');
    await account.update.click();

    await expect(account.emailValidationMsg)
      .toHaveText(WarningMessages.MANDATORY_MSG);
  });

  test('Email must follow correct format', async ({ page }) => {
    const account = new AccountPage(page);
    await account.email.fill('wrong-email-format');
    await account.update.click();

    await expect(account.emailValidationMsg)
      .toHaveText(/email không hợp lệ/i);
  });

  // ---------------------- PHONE VALIDATION ----------------------
  test('Phone number cannot be empty', async ({ page }) => {
    const account = new AccountPage(page);

    await account.phone.fill('');
    await account.update.click();

    await expect(account.phoneValidationMsg).toBeVisible();
    await expect(account.phoneValidationMsg)
      .toHaveText(WarningMessages.PHONE_VALIDATION_MSG);
  });

  test('Phone must contain only numbers', async ({ page }) => {
    const account = new AccountPage(page);

    await account.phone.fill('abc123');
    await account.update.click();

    await expect(account.phoneValidationMsg)
      .toHaveText(/vui lòng nhập số/i);
  });

});
