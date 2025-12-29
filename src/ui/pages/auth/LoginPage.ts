/* =====================================================
src/ui/pages/auth/LoginPage.ts
===================================================== */
import { CommonPage } from '../common/CommonPage';
import { expect } from '@playwright/test';


export class LoginPage extends CommonPage {
// get root() { return this.page.locator('#login'); }
get email() { return this.page.getByRole('textbox', { name: 'Tài Khoản' }); }
get password() { return this.page.getByRole('textbox', { name: 'Mật Khẩu' }); }
get login() {return this.page.getByRole('button', { name: 'Đăng nhập' });}
// get loginMsg() {return this.page.getByRole('heading', { name: 'Đăng nhập thành công' });}
get accountValidationMsg() {return this.page.locator('#taiKhoan-helper-text');}
get passwordValidationMsg() {return this.page.locator('#matKhau-helper-text');}
get loginValidationMsg() {return this.page.getByText('Tài khoản hoặc mật khẩu không');}
get submit() { return this.page.getByRole('button', { name: 'Đăng nhập' }); }

async waitForLoaded() { await expect(this.email).toBeVisible(); }
async open() {
    await this.smartNavigate('/sign-in', '/sign-in');
    await this.waitForLoaded();
}

async submitLogin(email: string, pw: string) 
{ 
    await this.fill(this.email, email); 
    await this.fill(this.password, pw);
    await this.submit.click(); 
}
}