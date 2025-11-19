import { Locator, Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class SignUpPage extends CommonPage {

    constructor(page: Page) {
        super(page);
    }

    private readonly txtAccountSignUp = this.page.getByRole('textbox', { name: 'Tài Khoản' });
    private readonly txtPasswordSignUp = this.page.getByRole('textbox', { name: 'Mật Khẩu', exact: true });
    private readonly txtConfirmPasswordSignUp = this.page.getByRole('textbox', { name: 'Nhập lại mật khẩu' });
    private readonly txtUserNameSignUp = this.page.getByRole('textbox', { name: 'Họ tên' });
    private readonly txtEmailSignUp = this.page.getByRole('textbox', { name: 'Email' });
    
    private readonly btnSignUpForm = this.page.getByRole('button', { name: 'Đăng ký' });
    private readonly btnViewPassword = this.page.getByRole('button').first();
    private readonly btnViewConfirmPassword = this.page.getByRole('button').nth(1);
    private readonly lnkLoginLink = this.page.getByRole('link', { name: 'Bạn đã có tài khoản? Đăng nhập' });

    private readonly lblAccountValidationMsg = this.page.locator('#taiKhoan-helper-text');
    private readonly lblPasswordValidationMsg = this.page.locator('#matKhau-helper-text');
    private readonly lblConfirmPasswordValidationMsg = this.page.locator('#confirmPassWord-helper-text');
    private readonly lblUserNameValidationMsg = this.page.locator('#hoTen-helper-text');
    private readonly lblEmailValidationMsg = this.page.locator('#email-helper-text');
    private readonly lblSignUpMsg = this.page.getByRole('heading', { name: 'Đăng ký thành công' });

    getLblSignUpMsgLocator() : Locator{
        return this.lblSignUpMsg;
    }

    async enterAccount(value: string) {
        await this.fill(this.txtAccountSignUp, value);
    }
    
    async enterPassword(value: string) {
        await this.fill(this.txtPasswordSignUp, value);
    }

    async enterConfirmPassword(value: string) {
        await this.fill(this.txtConfirmPasswordSignUp, value);
    }

    async enterUserName(value: string) {
        await this.fill(this.txtUserNameSignUp, value);
    }

    async enterEmail(value: string) {
        await this.fill(this.txtEmailSignUp, value);
    }

    async clickSignUp(){
        await this.click(this.btnSignUpForm);
    }

    async signUp(account: string, password: string, confirmPassword: string, userName: string, email: string){
        await this.enterAccount(account);
        await this.enterPassword(password);
        await this.enterConfirmPassword(confirmPassword);
        await this.enterUserName(userName);
        await this.enterEmail(email);
        await this.clickSignUp();
    }

}