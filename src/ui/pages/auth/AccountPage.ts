/* =====================================================
src/ui/pages/auth/AccountPage.ts
===================================================== */
import { CommonPage } from '../common/CommonPage';
import { expect } from '@playwright/test';


export class AccountPage extends CommonPage {
    get username() { return this.page.getByRole('textbox', { name: 'Tài Khoản' }); }
    get password() { return this.page.getByRole('textbox', { name: 'Mật Khẩu' }); }
    get confirmPassword() { return this.page.getByRole('textbox', { name: 'Nhập lại mật khẩu' }); }
    get fullName() { return this.page.getByRole('textbox', { name: 'Họ tên' }); }
    get email() { return this.page.getByRole('textbox', { name: 'Email' }); }
    get phone() { return this.page.getByRole('textbox', { name: 'Số điện thoại' }); }
    get userType() { return this.page.getByLabel('Mã Loại Người Dùng'); }

    get update() { return this.page.getByRole('button', { name: 'Cập Nhật' }); }
    get displayPassword() { return this.page.getByRole('button').filter({ hasText: /^$/ }); }


    get updateMsg() { return this.page.getByRole('heading', { name: 'Cập nhật thành công' }); }
    get close() { return this.page.getByRole('button', { name: 'Đóng' }); }

    get passwordValidationMsg() { return this.page.locator('#matKhau-helper-text'); }
    get userNameValidationMsg() { return this.page.locator('#hoTen-helper-text'); }
    get emailValidationMsg() { return this.page.locator('#email-helper-text'); }
    get phoneValidationMsg() { return this.page.getByText('Vui lòng nhập số điện thoại'); }
    get ticketHistory() { return this.page.getByRole('heading', { name: 'Lịch sử đặt vé' }); }
    get tickets() { return this.page.getByText('Ngày đặt: 16-11-2025 | 14:37T'); }
    get root() { return this.page.locator('#account'); }
    get name() { return this.root.locator('.display-name'); }
    async waitForLoaded() { await expect(this.root).toBeVisible(); }
}