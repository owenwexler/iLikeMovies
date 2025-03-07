import { test, expect } from '@playwright/test';
import { checkLocatorExistence, setMobileViewport } from './globalTestFunctions/globalTestFunctions';

import { checkLogoExistence, checkAddMovieFormExistence, checkFilterFormExistence } from './globalTestFunctions/staticElementTestFunctions';

test.describe('Static elements', () => {
  test.beforeEach(async ({ page }) => {
    await setMobileViewport(page);
    await page.goto('/');
  });

  test('All static elements are rendered properly on the page', async ({ page }) => {
    const exists = true;

    await checkLogoExistence(page, {
      exists
    });

    await checkAddMovieFormExistence(page, {
      exists
    });

    await checkFilterFormExistence(page, {
      exists
    });
  });
});
