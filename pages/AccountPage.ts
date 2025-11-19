import { Locator, Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class AccountPage extends CommonPage {

    constructor(page: Page) {
        super(page);
    }

    private readonly txtAccountSignUp = this.page.getByRole('textbox', { name: 'Tài Khoản' });
    private readonly txtPasswordSignUp = this.page.getByRole('textbox', { name: 'Mật Khẩu' });
    private readonly txtConfirmPasswordSignUp = this.page.getByRole('textbox', { name: 'Nhập lại mật khẩu' });
    private readonly txtUserNameSignUp = this.page.getByRole('textbox', { name: 'Họ tên' });
    private readonly txtEmailSignUp = this.page.getByRole('textbox', { name: 'Email' });
    private readonly txtPhoneNumber = this.page.getByRole('textbox', { name: 'Số điện thoại' });
    private readonly optUserType = this.page.getByLabel('Mã Loại Người Dùng');

    private readonly btnUpdate = this.page.getByRole('button', { name: 'Cập Nhật' });
    private readonly btnViewPassword = this.page.getByRole('button').filter({ hasText: /^$/ });


    private readonly lblUpdateMsg = this.page.getByRole('heading', { name: 'Cập nhật thành công' });
    private readonly btnClose = this.page.getByRole('button', { name: 'Đóng' });

    private readonly lblPasswordValidationMsg = this.page.locator('#matKhau-helper-text');
    private readonly lblUserNameValidationMsg = this.page.locator('#hoTen-helper-text');
    private readonly lblEmailValidationMsg = this.page.locator('#email-helper-text');
    private readonly lblPhoneValidationMsg = this.page.getByText('Vui lòng nhập số điện thoại');
    private readonly ticketHistory = this.page.getByRole('heading', { name: 'Lịch sử đặt vé' });
    private readonly tickets = this.page.getByText('Ngày đặt: 16-11-2025 | 14:37T');

    getLblUpdateMsgLocator() : Locator{
        return this.lblUpdateMsg;
    }

    async updatePassword(value: string) {
        await this.fill(this.txtPasswordSignUp, value);
    }
    async updateUserName(value: string) {
        await this.fill(this.txtUserNameSignUp, value);
    }
    async updateEmail(value: string) {
        await this.fill(this.txtEmailSignUp, value);
    }
    async updatePhone(value: string) {
        await this.fill(this.txtPhoneNumber, value);
    }
    async clickUpdate(){
        await this.click(this.btnUpdate);
    }

    async updateAccount(password: string, userName: string, email: string, phone: string){
        await this.updatePassword(password);
        await this.updateUserName(userName);
        await this.updateEmail(email);
        await this.updatePhone(phone);
        await this.clickUpdate();
    }

}   