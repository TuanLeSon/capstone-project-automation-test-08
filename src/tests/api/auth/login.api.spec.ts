import { test, expect } from '@playwright/test';


test('API login returns token', async ({ request }) => {
const res = await request.post('https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap', { data: { taiKhoan: 'string', matKhau: 'string' } });
expect(res.status()).toBe(200);
const body = await res.json();
expect(body.content?.accessToken || body.content?.token).toBeTruthy();
});