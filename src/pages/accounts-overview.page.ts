import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { pause } from '../utils/helpers';

export interface AccountBalanceDetails {
  accountNumber: string;
  balance: string;
  availableAmount: string;
}

export class AccountsOverviewPage extends BasePage {
  readonly overviewHeading: Locator;
  readonly accountsTable: Locator;

  constructor(page: Page) {
    super(page);
    this.overviewHeading = page.getByRole('heading', { name: 'Accounts Overview' });
    this.accountsTable = page
      .getByRole('heading', { name: 'Accounts Overview' })
      .locator('xpath=following::table[1]');
  }

  async isAccountsOverviewVisible(): Promise<boolean> {
    return this.overviewHeading.isVisible();
  }

  async getBalanceDetails(): Promise<AccountBalanceDetails> {
    const dataRow = this.accountsTable.locator('tr').filter({ has: this.page.locator('td a') }).first();
    const accountNumber = ((await dataRow.locator('td').nth(0).textContent()) ?? '').trim();
    const balance = ((await dataRow.locator('td').nth(1).textContent()) ?? '').trim();
    const availableAmount = ((await dataRow.locator('td').nth(2).textContent()) ?? '').trim();

    return { accountNumber, balance, availableAmount };
  }

  printBalanceDetails(details: AccountBalanceDetails): void {
    console.log('\nAccounts Overview\n');
    console.log(details.accountNumber);
    console.log('\nBalance\n');
    console.log(details.balance);
    if (details.availableAmount) {
      console.log('\nAvailable Amount\n');
      console.log(details.availableAmount);
    }
    console.log('');
  }

  isValidBalanceFormat(balance: string): boolean {
    return /\$[\d,]+\.\d{2}/.test(balance);
  }

  async highlightBalanceArea(): Promise<void> {
    await this.accountsTable.evaluate((el) => {
      el.style.outline = '4px solid #e53935';
      el.style.boxShadow = '0 0 16px rgba(229, 57, 53, 0.9)';
      el.style.backgroundColor = '#fff9c4';
    });
    await pause(500);
  }
}
