import { Locator, Page } from "@playwright/test";

export class LogoutPage {
    constructor(private page: Page) {}

    private readonly dialogLogout = this.page.getByRole('dialog', { name: 'Bạn có muốn đăng xuất ?' });
    private readonly btnConfirmLogout = this.page.getByRole('button', { name: 'Đồng ý' });
    private readonly btnCancelLogout = this.page.getByRole('button', { name: 'Hủy' });
    private readonly lblLogoutDialogMsg = this.page.getByRole('heading', { name: 'Bạn có muốn đăng xuất ?' });
    private readonly lblLogoutSuccessMsg = this.page.getByRole('heading', { name: 'Đã đăng xuất' });
    private readonly logoutOverlay = this.page.locator('div').filter({ hasText: '?Bạn có muốn đăng xuất ?×Đồng' }).first();
    
    async confirmLogout() {
        await this.btnConfirmLogout.click();
    }

    async cancelLogout() {
        await this.btnCancelLogout.click();
    }

    getLogoutDialog(): Locator{
        return this.dialogLogout;
    }

    getLblLogoutDialogLocatorMsg(): Locator {
        return this.lblLogoutDialogMsg;
    }

    getLblLogoutSuccessMsg() {
        return this.lblLogoutSuccessMsg;
    }

    getLogoutOverlay(): Locator {
        return this.logoutOverlay;
    }
    async clickOutsideDialog() {
        const box = await this.dialogLogout.boundingBox();
        if (!box) throw new Error('Dialog not found');
        await this.page.mouse.click(box.x - 5, box.y - 5);
    }
}