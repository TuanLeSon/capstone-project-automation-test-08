// src/helpers/authHelper.ts
import { Page } from "@playwright/test";
import { testUser } from "./testUsers";
import { LoginPage } from "../ui/pages/auth/LoginPage";
import { HomePage } from "../ui/pages/home/HomePage";

export async function login(page: Page, email = testUser.account, password = testUser.password) {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    await login.open();
    await login.submitLogin(email, password);
    await home.topBar.account.waitFor({ state: 'visible' });
    await home.waitForLoaded();  
}
