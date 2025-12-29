import { test, expect } from '@playwright/test';
import { SignupPage } from '../../../ui/pages/auth/SignupPage';
import { WarningMessages } from '../../../shared/constants/WarningMessages';
import { testUser } from '../../../helpers/testUsers';
import { generateUser } from '../../../shared/generators/UserGenerator';


test.describe('Signup Validation', () => {

  test('Submit empty form → show required messages', async ({ page }) => {

    const signup = new SignupPage(page);
    signup.open();

    await signup.submit.click();

    await expect(signup.accountValidationMsg).toBeVisible();
    await expect(signup.userNameValidationMsg).toBeVisible();
    await expect(signup.emailValidationMsg).toBeVisible();
    await expect(signup.passwordValidationMsg).toBeVisible();
    await expect(signup.confirmPasswordValidationMsg).toBeVisible();
  });

  test('Invalid email format → email validation visible', async ({ page }) => {
    const signup = new SignupPage(page);
    await signup.open();

    await signup.email.fill('abc@');
    await signup.submit.click();

    await expect(signup.emailValidationMsg).toContainText(/email không hợp lệ/i);
  });

  test('Password too short → error message', async ({ page }) => {
    const signup = new SignupPage(page);
    await signup.open();

    await signup.password.fill('123');
    await signup.submit.click();

    await expect(signup.passwordValidationMsg).toContainText(WarningMessages.PASSWORD_LENGTH_MSG);
  });

  test('Confirm password not match → show mismatch error', async ({ page }) => {
    const signup = new SignupPage(page);
    await signup.open();

    await signup.password.fill('123456');
    await signup.confirmPassword.fill('aaa222');
    await signup.submit.click();

    await expect(signup.confirmPasswordValidationMsg).toContainText(WarningMessages.UN_MATCHED_MSG);
  });

  test('Fix input after validation → form valid now', async ({ page }) => {
    const signup = new SignupPage(page);
    await page.goto('/sign-up');

    await signup.password.fill('123');
    await signup.confirmPassword.fill('111');
    await signup.submit.click();
    // bị lỗi → sửa lại

    await signup.password.fill('123456');
    await signup.confirmPassword.fill('123456');
    await signup.submit.click();

    await expect(signup.confirmPasswordValidationMsg).toBeHidden();
  });

  test('Username with numbers → show validation error', async ({ page }) => {
    const signup = new SignupPage(page);
    await signup.open();

    await signup.fullName.fill('Nguyen Van 123');
    await signup.submit.click();

    await expect(signup.userNameValidationMsg).toContainText(WarningMessages.USER_NAME_VALIDATION_MSG);
  });

  test('Duplicate email → show duplicate error', async ({ page }) => {
    const signup = new SignupPage(page);
    await signup.open();
    const u = generateUser('ui');
    await signup.username.fill(u.username);
    await signup.fullName.fill(u.fullName);
    await signup.password.fill(u.password);
    await signup.confirmPassword.fill(u.confirmPassword);
    await signup.email.fill(testUser.email); // email đã tồn tại
    await signup.submit.click();
    await expect(signup.alertMsg).toContainText(WarningMessages.DUPLICATE_EMAIL_MSG);
  });

  test('Duplicate account → show duplicate error', async ({ page }) => {
    const signup = new SignupPage(page);
    await signup.open();
    const u = generateUser('ui');
    await signup.username.fill(testUser.account); // tài khoản đã tồn tại
    await signup.fullName.fill(u.fullName);
    await signup.password.fill(u.password);
    await signup.confirmPassword.fill(u.confirmPassword);
    await signup.email.fill(testUser.email);
    await signup.submit.click();
    await expect(signup.alertMsg).toContainText(WarningMessages.DUPLICATE_EMAIL_MSG);
  });

  test('Valid signup all fields → success popup', async ({ page }) => {
    const signup = new SignupPage(page);
    await page.goto('/sign-up');

    const u = generateUser('abc');
    // const id = Date.now();
    await signup.username.fill(u.username);
    await signup.fullName.fill(u.fullName);
    await signup.email.fill(u.email);
    await signup.password.fill(u.password);
    await signup.confirmPassword.fill(u.confirmPassword);
    await signup.submit.click();
    await expect(signup.signUpMsg).toBeVisible();
  });

});
