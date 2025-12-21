/* =====================================================
src/shared/generator/UserGenerator.ts
===================================================== */
export type TestUser = {
    username: string;
    confirmPassword: string;
    email: string;
    password: string;
    fullName: string;
};

export function generateUser(prefix = 'auto'): TestUser {
    const ts = Date.now();
    return {
        username: `${prefix}${ts}`,
        email: `${prefix}+${ts}@example.com`,
        password: `P@ssw0rd${String(ts).slice(-4)}`,
        confirmPassword: `P@ssw0rd${String(ts).slice(-4)}`,
        fullName: `Auto User`
    };
}