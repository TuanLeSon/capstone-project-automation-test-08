/* =====================================================
src/ui/components/TopBarNavigation.ts
===================================================== */
import { Page } from '@playwright/test';


export class TopBarNavigation {
// static account: any;
constructor(private readonly page: Page) {}
get root() { return this.page.getByRole('img', { name: 'Logo', exact: true }); }
get login() { return this.page.getByRole('link', { name: 'Đăng Nhập'}); }
get signup() { return this.page.getByRole('link', { name: 'Đăng Ký' }); }
get account() { return this.page.getByRole('link', { name: /^Avatar\s/i }); }
get logout() { return this.page.getByRole('button', { name: 'Đăng xuất' }); }
get showtimeBtn() { return this.page.locator('a').filter({ hasText: 'Lịch Chiếu' }); }
get cinemaClusterBtn() { return this.page.locator('a').filter({ hasText: 'Cụm Rạp' }); }
get newsBtn() { return this.page.locator('a').filter({ hasText: 'Tin Tức' }); }
get appBtn() { return this.page.locator('a').filter({ hasText: 'Ứng Dụng' }); }

async goToAccount() { await this.account.click(); }
async goToLogin() { await this.login.click(); }
async goToSignup() { await this.signup.click(); }
async logoutUser() { await this.logout.click(); }
async accountIsVisible() { await this.account.isVisible(); }
}