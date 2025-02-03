import { test, expect } from '@playwright/test';

import { setMobileViewport } from './globalTestFunctions/globalTestFunctions';

import testUserData from './testData/testUserData.json' assert { type: 'json' };
import type { UserMovie } from '../src/typedefs/UserMovie';
import { checkMovieListItemExistence, checkMultipleUserMovies } from './globalTestFunctions/globalTestFunctions';

const userMovies = testUserData ? testUserData as UserMovie[] : [] as UserMovie[];

test.describe('User movies', () => {
  test.beforeEach(async ({ page }) => {
    await setMobileViewport(page);
    await page.goto('/');
  });

  test('All user movies for test user are rendered on the page', async ({ page }) => {
    await checkMultipleUserMovies(page, {
      movies: userMovies,
      exists: true
    });
  });
});
