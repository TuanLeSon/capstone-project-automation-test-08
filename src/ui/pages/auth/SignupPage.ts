/* =====================================================
src/ui/pages/auth/SignupPage.ts
===================================================== */
import { CommonPage } from '../common/CommonPage';
import { expect } from '@playwright/test';


export class SignupPage extends CommonPage {
    get root() { return this.page.locator('div').filter({ hasText: 'Đăng kýTài Khoản *Tài Khoản *' }).nth(2); }
    get username() { return this.root.getByRole('textbox', { name: 'Tài Khoản' }); }
    get fullName() { return this.root.getByRole('textbox', { name: 'Họ tên' }); }
    get email() { return this.root.getByRole('textbox', { name: 'Email' }); }
    get password() { return this.page.getByRole('textbox', { name: 'Mật Khẩu', exact: true }); }
    get confirmPassword() { return this.page.getByRole('textbox', { name: 'Nhập lại mật khẩu' }); }
    get submit() { return this.page.getByRole('button', { name: 'Đăng ký' }); }

    get viewPasswordBtn() { return this.page.locator('button').filter({ hasText: 'visibility' }).first(); }
    get viewConfirmPasswordBtn() { return this.page.locator('button').filter({ hasText: 'visibility' }).nth(1); }

    get accountValidationMsg() { return this.page.locator('#taiKhoan-helper-text');}
    get passwordValidationMsg() { return this.page.locator('#matKhau-helper-text');}
    get confirmPasswordValidationMsg() { return this.page.locator('#confirmPassWord-helper-text');}
    get userNameValidationMsg() { return this.page.locator('#hoTen-helper-text');}
    get emailValidationMsg() { return this.page.locator('#email-helper-text');}
    get signUpMsg() {return this.page.getByRole('heading', { name: 'Đăng ký thành công' });}
    async waitForLoaded() { await expect(this.root).toBeVisible(); }
    async submitSignup(data) { 
        await this.fill(this.username, data.username);
        await this.fill(this.password, data.password);
        await this.fill(this.confirmPassword, data.confirmPassword);
        await this.fill(this.fullName, data.fullName);
        await this.fill(this.email, data.email); 
        await this.click(this.submit); 
    }
}