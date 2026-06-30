import { Page, Locator } from '@playwright/test';
import { config } from '../utils/config';
import { pause } from '../utils/helpers';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = ''): Promise<void> {
    await this.page.goto(path);
    await this.waitForPageLoad();
    await pause();
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  protected async fillWithPause(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
    await pause(config.fieldDelay);
  }

  protected async clickWithPause(locator: Locator): Promise<void> {
    await locator.click();
    await pause(config.fieldDelay);
  }

  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }
}
