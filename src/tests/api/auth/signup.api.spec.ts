import { test, expect } from '@playwright/test';
import { generateUser } from '../../../shared/generators/UserGenerator';


test('API signup create new user', async ({ request }) => {
const u = generateUser('api');
const res = await request.post('/api/QuanLyNguoiDung/DangKy', { data: { taiKhoan: u.username, matKhau: u.password, email: u.email, soDt: '0912345678', maNhom: 'GP01', hoTen: u.fullName } });
expect(res.status()).toBe(200);
const body = await res.json();
expect(body.content.email || body.content).toBeTruthy();
});