import { expect } from '@playwright/test';
import { Given, When, Then } from '../hooks/hooks';
import {
  loadLoginTestData,
  loadRegistrationTestData,
  saveLoginScreenshot,
  saveRegistrationScreenshot,
  saveAccountBalanceScreenshot,
} from '../utils/test-data.loader';

Given('I am on the ParaBank sign-in page', async ({ signInPage }) => {
  const testData = loadLoginTestData('login-kavya.json');
  await signInPage.openWithUrl(testData.baseUrl);
});

When('I login using data from {string}', async ({ signInPage }, fileName: string) => {
  const testData = loadLoginTestData(fileName);
  await signInPage.login(testData.username, testData.password);
});

When(
  'I register using data from {string}',
  async ({ signInPage, registerPage }, fileName: string) => {
    const testData = loadRegistrationTestData(fileName);
    await signInPage.clickRegister();
    await registerPage.register(testData.user);
  },
);

Then('the account should be created successfully', async ({ registerPage, page }) => {
  const isCreated = await registerPage.isAccountCreatedSuccessfully();
  if (isCreated) {
    await saveRegistrationScreenshot(page);
    expect(isCreated).toBe(true);
    return;
  }

  const usernameExists = await page.getByText('This username already exists.').isVisible();
  expect(usernameExists).toBe(true);
});

Then('I should be logged in successfully', async ({ signInPage, page }) => {
  expect(await signInPage.isLoggedIn()).toBe(true);
  await saveLoginScreenshot(page);
});

Then(
  'I verify account balance and capture screenshot',
  async ({ accountsOverviewPage, page }) => {
    expect(await accountsOverviewPage.isAccountsOverviewVisible()).toBe(true);

    const details = await accountsOverviewPage.getBalanceDetails();
    accountsOverviewPage.printBalanceDetails(details);

    expect(details.accountNumber.length).toBeGreaterThan(0);
    expect(accountsOverviewPage.isValidBalanceFormat(details.balance)).toBe(true);

    await accountsOverviewPage.highlightBalanceArea();
    await saveAccountBalanceScreenshot(page, accountsOverviewPage.accountsTable);
  },
);
