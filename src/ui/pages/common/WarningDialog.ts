import { CommonPage } from '../common/CommonPage';
import { expect } from '@playwright/test';

export class WarningDialog extends CommonPage {
    get root() { return this.page.getByRole('dialog'); }
    get title() { return this.root.locator('h2'); }
    get message() { return this.root.locator('#swal2-content'); }
    get closeButton() { return this.root.getByRole('button', { name: 'Đã hiểu' }); }
    get approveButton() { return this.root.getByRole('button', { name: 'Đồng ý' }); }
    get rejectButton() { return this.root.getByRole('button', { name: 'Không' }); }
    get cancelButton() { return this.root.getByRole('button', { name: 'Hủy' }); }
    async waitForLoaded() { await expect(this.root).toBeVisible(); }
    async close() { await this.click(this.closeButton); }

    async expectMessage(expectedTitle: string, expectedMessage: string) {
        await expect(this.title).toHaveText(expectedTitle);
        await expect(this.message).toHaveText(expectedMessage);
    }

    async closeByOverLay() {
        await this.page.click('.swal2-container');
    }

    async expectClosed() {
        await expect(this.root).toBeHidden();
    }
}