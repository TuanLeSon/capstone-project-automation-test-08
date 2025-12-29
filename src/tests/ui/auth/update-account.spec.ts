// tests/account/AccountUpdate.spec.ts
import { test, expect } from "@playwright/test";
import { testUser } from "../../../helpers/testUsers";
import { HomePage } from "../../../ui/pages/home/HomePage";
import { LoginPage } from "../../../ui/pages/auth/LoginPage";
import { SignupPage } from "../../../ui/pages/auth/SignupPage";
import { AccountPage } from "../../../ui/pages/auth/AccountPage";
import { generateUser } from "../../../shared/generators/UserGenerator";


test.describe("Account Update Profile", () => {
    test("User can update profile info successfully", async ({ page }) => {
        const home = new HomePage(page);
        const login = new LoginPage(page);
        const u = generateUser('ui');
        await login.open();
        await login.waitForLoaded();
        await login.submitLogin(testUser.account, testUser.password);
        await home.topBar.account.waitFor({ state: 'visible' });
        expect (home.topBar.account).toBeVisible();
        const account = new AccountPage(page);
        await account.open();
        await account.waitForLoaded();
  
        await account.updateAccount(u.fullName, u.phone);

        await page.reload();
        await account.waitForLoaded();
        await expect(account.fullName).toHaveValue(u.fullName);
        await expect(account.phone).toHaveValue(u.phone);
    });

});
