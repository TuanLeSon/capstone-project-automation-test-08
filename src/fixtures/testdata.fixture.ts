import { test as base } from '@playwright/test';
import { generateUser } from '../shared/generators/UserGenerator';
import type { Account } from '../shared/models/Account';

export const test = base.extend<{
  user: Account;
}>({
  user: async ({}, use) => {
    const u = generateUser('fixture');
    await use(u);
  }
});
