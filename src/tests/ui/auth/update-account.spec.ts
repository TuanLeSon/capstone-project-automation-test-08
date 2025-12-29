// tests/account/AccountUpdate.spec.ts
import { test, expect } from "@playwright/test";
import { testUser } from "../../../helpers/testUsers";
import { HomePage } from "../../../ui/pages/home/HomePage";
import { LoginPage } from "../../../ui/pages/auth/LoginPage";
import { SignupPage } from "../../../ui/pages/auth/SignupPage";
import { AccountPage } from "../../../ui/pages/auth/AccountPage";


test.describe("Account Update Profile", () => {
    test("User can update profile info successfully", async ({ page }) => {
        const home = new HomePage(page);
        const login = new LoginPage(page);
        await login.open();
        await login.submitLogin(testUser.account, testUser.password);
        expect (home.topBar.account).toBeVisible();
        home.topBar.account.click();
        const account = new AccountPage(page);
        await account.waitForLoaded();
        await account.updateAccount({
            // password: 'StrongPass123',
            fullName: 'Nguyen Van Updated',
            // email: 'updated.user@example.com',
            phone: '0912345678'
        });

        page.reload();
        await account.waitForLoaded();
        await expect(account.fullName).toHaveValue('Nguyen Van Updated');
        await expect(account.phone).toHaveValue('0912345678');
    });

});
