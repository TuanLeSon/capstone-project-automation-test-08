import { Locator, Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class LoginPage extends CommonPage {
    
    constructor(page: Page) {
        super(page);
    }

    private readonly txtAccountLogin = this.page.getByRole('textbox', { name: 'Tài Khoản' });
    private readonly txtPasswordLogin = this.page.getByRole('textbox', { name: 'Mật Khẩu' });
    private readonly btnLoginForm = this.page.getByRole('button', { name: 'Đăng nhập' });
    private readonly lblLoginMsg = this.page.getByRole('heading', { name: 'Đăng nhập thành công' });
    private readonly lblAccountValidationMsg = this.page.locator('#taiKhoan-helper-text');
    private readonly lblPasswordValidationMsg = this.page.locator('#matKhau-helper-text');
    private readonly lblLoginValidationMsg = this.page.getByText('Tài khoản hoặc mật khẩu không');
    // readonly lblAccountValidationMsg = this.page.locator('')

    getLblLoginMsgLocator() : Locator{
        return this.lblLoginMsg;
    }
    
    async enterAccount(value: string) {
        await this.fill(this.txtAccountLogin, value);
    }
    
    async enterPassword(value: string) {
        await this.fill(this.txtPasswordLogin, value);
    }

    async clickLogin(){
        await this.click(this.btnLoginForm);
    }

    async login(account: string, password: string){
        console.log('Entering username:', account);
        await this.enterAccount(account);
        console.log('Entering password:', password);
        await this.enterPassword(password);
        console.log('Submitting login form...');
        await this.clickLogin();
    }
}