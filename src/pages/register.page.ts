import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class RegisterPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneInput: Locator;
  readonly ssnInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('#customer\\.firstName');
    this.lastNameInput = page.locator('#customer\\.lastName');
    this.addressInput = page.locator('#customer\\.address\\.street');
    this.cityInput = page.locator('#customer\\.address\\.city');
    this.stateInput = page.locator('#customer\\.address\\.state');
    this.zipCodeInput = page.locator('#customer\\.address\\.zipCode');
    this.phoneInput = page.locator('#customer\\.phoneNumber');
    this.ssnInput = page.locator('#customer\\.ssn');
    this.usernameInput = page.locator('#customer\\.username');
    this.passwordInput = page.locator('#customer\\.password');
    this.confirmPasswordInput = page.locator('#repeatedPassword');
    this.registerButton = page.locator('input[value="Register"]');
  }

  async register(user: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    ssn: string;
    username: string;
    password: string;
    confirmPassword?: string;
  }): Promise<void> {
    await this.fillWithPause(this.firstNameInput, user.firstName);
    await this.fillWithPause(this.lastNameInput, user.lastName);
    await this.fillWithPause(this.addressInput, user.address);
    await this.fillWithPause(this.cityInput, user.city);
    await this.fillWithPause(this.stateInput, user.state);
    await this.fillWithPause(this.zipCodeInput, user.zipCode);
    await this.fillWithPause(this.phoneInput, user.phone);
    await this.fillWithPause(this.ssnInput, user.ssn);
    await this.fillWithPause(this.usernameInput, user.username);
    await this.fillWithPause(this.passwordInput, user.password);
    await this.fillWithPause(this.confirmPasswordInput, user.confirmPassword ?? user.password);
    await this.clickWithPause(this.registerButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isAccountCreatedSuccessfully(): Promise<boolean> {
    const url = this.page.url();
    if (/welcome\.htm|overview\.htm/i.test(url)) {
      return true;
    }
    const message = await this.page.locator('.title').first().textContent();
    return /welcome|successfully|created/i.test(message ?? '');
  }
}
