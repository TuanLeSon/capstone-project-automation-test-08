/* =====================================================
AccountPage.ts
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
    get fullnameValidationMsg() { return this.page.locator('#hoTen-helper-text'); }
    get emailValidationMsg() { return this.page.locator('#email-helper-text'); }
    get phoneValidationMsg() { return this.page.locator('#soDt-helper-text'); }
    get ticketHistory() { return this.page.getByRole('heading', { name: 'Lịch sử đặt vé' }); }
    // get tickets() { return this.page.getByText('Ngày đặt: 16-11-2025 | 14:37T'); }
    get root() { return this.page.getByRole('main'); }
    get name() { return this.root.locator('.display-name'); }
    async waitForLoaded() { await expect(this.root).toBeVisible(); }
    get bookingHistory_root() { return this.page.locator('.MuiTypography-root .MuiTypography-h1').nth(1); }
    // Root booking history list container
    get bookingHistory() { return this.page.locator('h1.MuiTypography-h1'); }

    // Một item vé (mỗi block chứa thông tin film)
    get bookings() {
        return this.page.locator('.MuiGrid-root.MuiGrid-item');
    }

    // lấy item theo tên film
    bookingItem(movie: string) {
        return this.bookings.filter({ hasText: movie });
    }

    async expectBookingExists(movie: string) {
        await expect(this.bookingItem(movie)).toBeVisible();
    }

    async updateAccount(password?: string, fullName?: string, email?: string, phone?: string) {
  
        if (password) await this.password.fill(password);
        if (fullName) await this.fullName.fill(fullName);
        if (email)    await this.email.fill(email);
        if (phone)    await this.phone.fill(phone);
      
        await this.update.click();
      }
      

    async open() {
        await this.smartNavigate('/account', '/account');
        await this.waitForLoaded();
    }

    async getNumberOfBookings() {
        return await this.bookings.count();
    }
}