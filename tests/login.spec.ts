import {expect, test} from '../fixtures/custom-fixtures';

test.describe('Login Test Feature', () => {

    test.beforeEach(async ({ page }) => {
        console.log('Before each executed');
    });

    test('Verify Valid Login Successfully', async ({ homePage, loginPage }) => {


        console.log('Test case: Verify Valid Login Successfully');

        //Step 1: Navigate to https://demo1.cybersoft.edu.vn/
        await homePage.navigateTo();

        //Step 2: Click on Đăng Nhập link
        await homePage.topBarNavigation.navigateLoginPage();

        //Step 3: Enter account
        //Step 4: Enter password
        //Step 5: Click on Đăng nhập button

        await loginPage.login('202511', '123456');
        await expect(loginPage.getLblLoginMsgLocator()).toBeVisible();

        //VPw: User profile displays on the top right
        await expect(homePage.topBarNavigation.getUserProfileLocator("Today")).toBeVisible();
        
    })

    test('Verify Invalid login', async ({ page }) => {
        console.log('Test case: Verify Invalid login');
    })

    test.afterEach(async ({ page }) => {
        console.log('After each executed');
    })
    
})


