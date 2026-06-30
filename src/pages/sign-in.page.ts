import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { pause } from '../utils/helpers';

export class SignInPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[value="Log In"]');
    this.registerLink = page.getByRole('link', { name: 'Register' });
  }

  async openWithUrl(url: string): Promise<void> {
    await this.page.goto(url);
    await this.waitForPageLoad();
    await pause();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillWithPause(this.usernameInput, username);
    await this.fillWithPause(this.passwordInput, password);
    await this.clickWithPause(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isLoggedIn(): Promise<boolean> {
    const url = this.page.url();
    if (/overview\.htm/.test(url)) {
      return true;
    }
    return this.page.getByRole('link', { name: 'Log Out' }).isVisible();
  }

  async clickRegister(): Promise<void> {
    await this.clickWithPause(this.registerLink);
  }
}
