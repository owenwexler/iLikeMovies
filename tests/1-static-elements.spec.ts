import { test, expect } from '@playwright/test';
import { checkLocatorExistence } from './globalTestFunctions/globalTestFunctions';

import { checkLogoExistence, checkAddMovieFormExistence } from './globalTestFunctions/staticElementTestFunctions';

test.describe('Static elements', () => {
  test.beforeEach(async ({ page }) => {
    await setTabletViewport(page);
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
