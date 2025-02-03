import { test, expect } from '@playwright/test';

import testUserData from './testData/testUserData.json' assert { type: 'json' };
import type { UserMovie } from '../src/typedefs/UserMovie';
import { checkMovieListItemExistence } from './globalTestFunctions/globalTestFunctions';
import { setMobileViewport } from './globalTestFunctions/globalTestFunctions';

const userMovies = testUserData ? testUserData as UserMovie[] : [] as UserMovie[];

test.describe('Filters', () => {
  test.beforeEach(async ({ page }) => {
    await setMobileViewport(page);
    await page.goto('/');
  });

  test('all static filter elements exist', async ({ page }) => {
    await expect(page.locator('#movie-filter-all')).toBeVisible();
    await expect(page.getByText('All Movies')).toBeVisible();
    await expect(page.locator('#movie-filter-watched')).toBeVisible();
    await expect(page.getByText('Watched')).toBeVisible();
    await expect(page.locator('#label-watched')).toContainText('Watched');
    await expect(page.locator('#movie-filter-unwatched')).toBeVisible();
    await expect(page.locator('#label-unwatched')).toBeVisible();
    await expect(page.locator('#label-unwatched')).toContainText('To Watch');
    await expect(page.locator('#label-all')).toContainText('All Movies');
  });

  test('the app starts with filters set to all movies and all current user movies are shown', () => {
    
  });
});
