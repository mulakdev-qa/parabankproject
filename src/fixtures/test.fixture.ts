import { test as base } from 'playwright-bdd';
import { SignInPage, RegisterPage, AccountsOverviewPage } from '../pages';

type PageFixtures = {
  signInPage: SignInPage;
  registerPage: RegisterPage;
  accountsOverviewPage: AccountsOverviewPage;
};

export const test = base.extend<PageFixtures>({
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  accountsOverviewPage: async ({ page }, use) => {
    await use(new AccountsOverviewPage(page));
  },
});

export { expect } from '@playwright/test';
