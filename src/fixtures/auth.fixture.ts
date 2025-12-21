import { test as base } from '@playwright/test';
import { AuthFlow } from '../ui/flows/AuthFlow';
import { generateUser, TestUser} from '../shared/generators/UserGenerator';

type AuthFixtures = {
  loggedInUser: TestUser;
};

export const test = base.extend<AuthFixtures>({
  loggedInUser: async ({ page }, use) => {
    const flow = new AuthFlow(page);
    const user = generateUser('fix');

    await flow.signupUi(user);

    await use(user);
  }
});
