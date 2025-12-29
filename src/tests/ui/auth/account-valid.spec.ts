import { test, expect } from '@playwright/test';
import { login } from '../../../helpers/authHelper';
; // nếu chưa có thì đổi thành manual login
import { AccountPage } from '../../../ui/pages/auth/AccountPage';

test.describe('Account Page - Field Validation', () => {

  test.beforeEach(async ({ page }) => {
    await login(page);                   // login để vào account page
    const account = new AccountPage(page);
    await account.open();
  });

  // ---------------------- USERNAME VALIDATION ----------------------
  test('Username cannot be empty', async ({ page }) => {
    const account = new AccountPage(page);
    await account.username.fill('');
    await account.update.click();

    await expect(account.userNameValidationMsg)
      .toHaveText(/vui lòng nhập/i);
  });

  test('Username cannot contain numbers', async ({ page }) => {
    const account = new AccountPage(page);

    await account.fullName.fill('John123');
    await account.update.click();

    await expect(account.userNameValidationMsg)
      .toHaveText(/không chứa số/i);
  });

  // ---------------------- PASSWORD VALIDATION ----------------------
  test('Password cannot be empty', async ({ page }) => {
    const account = new AccountPage(page);

    await account.password.fill('');
    await account.update.click();

    await expect(account.passwordValidationMsg)
      .toHaveText(/vui lòng nhập mật khẩu/i);
  });

  test('Password must be at least 6 chars', async ({ page }) => {
    const account = new AccountPage(page);

    await account.password.fill('123');
    await account.update.click();

    await expect(account.passwordValidationMsg)
      .toHaveText(/tối thiểu 6 ký tự/i);
  });

  test('Confirm password must match Password', async ({ page }) => {
    const account = new AccountPage(page);

    await account.password.fill('123456');
    await account.confirmPassword.fill('000000');
    await account.update.click();

    await expect(account.passwordValidationMsg)
      .toHaveText(/không trùng khớp/i);
  });

  // ---------------------- EMAIL VALIDATION ----------------------
  test('Email cannot be empty', async ({ page }) => {
    const account = new AccountPage(page);
    await account.email.fill('');
    await account.update.click();

    await expect(account.emailValidationMsg)
      .toHaveText(/vui lòng nhập email/i);
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

    await expect(account.phoneValidationMsg)
      .toBeVisible();
  });

  test('Phone must contain only numbers', async ({ page }) => {
    const account = new AccountPage(page);

    await account.phone.fill('abc123');
    await account.update.click();

    await expect(account.phoneValidationMsg)
      .toHaveText(/vui lòng nhập số/i);
  });

});
