import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class TopBarNavigation extends BasePage {

    private readonly btnRegisterLink = this.page.getByRole('link', { name: 'Đăng Ký' });
    private readonly btnLoginLink = this.page.getByRole('link', { name: 'Đăng Nhập' });
    private readonly btnLogoutLink = this.page.getByRole('link', { name: 'Đăng xuất' })
    private userProfile = "Avatar %s";

    constructor(page: Page){
        super(page);
    }
    
    getUserProfileLocator(name: string): Locator {
        let userProfileName = this.userProfile.replace("%s", name);
    return this.page.getByRole("link", { name: `${userProfileName}` });
    }

    async navigateSignUpPage() {
        console.log('Waiting for Register button to be visible...');
        await this.btnRegisterLink.waitFor({ state: 'visible' });
        console.log('Clicking Register button...');
        await this.click(this.btnRegisterLink);
    }

    async navigateLoginPage() {
        console.log('Waiting for Login button to be visible...');
        await this.btnLoginLink.waitFor({ state: 'visible' });
        console.log('Clicking Login button...');
        await this.click(this.btnLoginLink);
    }

    // async navigateUserProfile() {
    //     await this.navigateTo('/account');
    // }

    async clickLogout(){
        console.log('Waiting for Logout button to be visible...');
        await this.btnLogoutLink.waitFor({ state: 'visible' });
        console.log('Clicking Logout button...');
        await this.click(this.btnLogoutLink);
    }

    getBtnLogoutLocator(): Locator {
        return this.btnLogoutLink;
    }
}