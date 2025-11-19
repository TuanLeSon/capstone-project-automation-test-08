import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class TopBarNavigation extends BasePage {

    private readonly btnRegisterLink = this.page.getByRole('link', { name: 'Đăng Ký' });
    private readonly btnLoginLink = this.page.getByRole('link', { name: 'Đăng Nhập' });
    private userProfile = "Avatar %s";

    constructor(page: Page){
        super(page);
    }
    
    getUserProfileLocator(name: string): Locator {
        let userProfileName = this.userProfile.replace("%s", name);
    return this.page.getByRole("link", { name: `${userProfileName}` });
    }

    async navigateSignUpPage() {
        await this.click(this.btnRegisterLink);
    }

    async navigateLoginPage() {
        await this.click(this.btnLoginLink);
    }

    // async navigateUserProfile(name: string) {
    //     const userProfileLocator = this.getUserProfileLocator(name);
    //     await this.click(userProfileLocator);
    // }

    async navigateUserProfile() {
        await this.navigateTo('/account');
    }
}