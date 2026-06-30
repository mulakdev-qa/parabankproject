import fs from 'fs';
import path from 'path';
import { Page, Locator } from '@playwright/test';

export interface RegistrationUser {
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
  confirmPassword: string;
}

export interface RegistrationTestData {
  baseUrl: string;
  user: RegistrationUser;
}

export interface LoginTestData {
  baseUrl: string;
  username: string;
  password: string;
}

export function loadRegistrationTestData(fileName: string): RegistrationTestData {
  const filePath = path.resolve(__dirname, '../../test-data', fileName);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as RegistrationTestData;
}

export function loadLoginTestData(fileName: string): LoginTestData {
  const filePath = path.resolve(__dirname, '../../test-data', fileName);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as LoginTestData;
}

export async function saveRegistrationScreenshot(page: Page): Promise<void> {
  const screenshotsDir = path.resolve(__dirname, '../../screenshots');
  fs.mkdirSync(screenshotsDir, { recursive: true });
  await page.screenshot({
    path: path.join(screenshotsDir, 'successful-registration.png'),
    fullPage: true,
  });
}

export async function saveLoginScreenshot(page: Page): Promise<void> {
  const screenshotsDir = path.resolve(__dirname, '../../screenshots');
  fs.mkdirSync(screenshotsDir, { recursive: true });
  await page.screenshot({
    path: path.join(screenshotsDir, 'successful-login.png'),
    fullPage: true,
  });
}

export async function saveAccountBalanceScreenshot(page: Page, balanceArea: Locator): Promise<void> {
  const screenshotsDir = path.resolve(__dirname, '../../screenshots');
  fs.mkdirSync(screenshotsDir, { recursive: true });
  await balanceArea.screenshot({
    path: path.join(screenshotsDir, 'account-balance-highlighted.png'),
  });
}
