import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../ui/pages/auth/LoginPage';
import { WarningMessages } from '../../../shared/constants/WarningMessages';


test.describe('Login Validation', () => {

  test('Empty Email & Password → show required validation', async ({ page }) => {
    const login = new LoginPage(page);
    login.open();

    await login.submit.click();

    await expect(login.accountValidationMsg).toHaveText(/không được để trống/i);
    await expect(login.passwordValidationMsg).toHaveText(/không được để trống/i);
  });

  test('Empty Email only → show email required message', async ({ page }) => {
    const login = new LoginPage(page);
    login.open();

    await login.password.fill('123456');
    await login.submit.click();

    await expect(login.accountValidationMsg).toBeVisible();
  });

  test('Empty Password only → show password required message', async ({ page }) => {
    const login = new LoginPage(page);
    login.open();

    await login.email.fill('test@gmail.com');
    await login.submit.click();

    await expect(login.passwordValidationMsg).toBeVisible();
  });

  test('Wrong password → show invalid account message', async ({ page }) => {
    const login = new LoginPage(page);
    login.open();

    await login.email.fill('test@gmail.com');
    await login.password.fill('wrongpass');
    await login.submit.click();

    await expect(login.loginValidationMsg).toBeVisible();
  });

  test('Password too short → error message', async ({ page }) => {
    const login = new LoginPage(page);
    login.open();

    await login.password.fill('123');
    await login.submit.click();

    await expect(login.passwordValidationMsg).toContainText(WarningMessages.PASSWORD_LENGTH_MSG);
  });
});

