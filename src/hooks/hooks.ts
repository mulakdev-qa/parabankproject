import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/test.fixture';

export const { Given, When, Then, Before } = createBdd(test);

Before(async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
});
