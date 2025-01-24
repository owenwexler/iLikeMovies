import { test, expect } from '@playwright/test';
import { setMobileViewport } from './globalTestFunctions/globalTestFunctions';

test.describe('Static elements', () => {
  test.beforeEach(async ({ page }) => {
    await setMobileViewport(page);
    await page.goto('/');
  });

  test('All static elements are visible on the page', () => {

  });
});

