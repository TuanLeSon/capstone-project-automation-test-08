/* =====================================================
src/ui/flows/AuthFlow.ts
===================================================== */
import { LoginPage } from '../pages/auth/LoginPage';
import { SignupPage } from '../pages/auth/SignupPage';
import { AccountPage } from '../pages/auth/AccountPage';


export class AuthFlow {
    constructor(private readonly page) { }


    async loginUi(user: { email: string; password: string }) {
        const login = new LoginPage(this.page);
        await login.waitForLoaded();
        await login.submitLogin(user.email, user.password);
        const account = new AccountPage(this.page);
        await account.waitForLoaded();
    }


    async signupUi(user) {
        const signup = new SignupPage(this.page);
        await signup.waitForLoaded();
        await signup.submitSignup(user);
        const account = new AccountPage(this.page);
        try { await account.waitForLoaded(); } catch (e) { /* let test assert redirect */ }
    }

    // async logoutUi() {
    //     const account = new AccountPage(this.page);
    //     await account.waitForLoaded();
    //     await account.logoutUser();
    //     const login = new LoginPage(this.page);
    //     await login.waitForLoaded();
    // }
}