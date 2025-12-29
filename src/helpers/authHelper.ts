// src/helpers/authHelper.ts
import { Page } from "@playwright/test";
import { testUser } from "./testUsers";

export async function login(page: Page, email = testUser.account, password = testUser.password) {
    await page.goto('/login');
    await page.getByPlaceholder('Email').fill(email);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Đăng nhập' }).click();

    await page.waitForURL('/account', { timeout: 5000 });
}
