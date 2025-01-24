import { test, expect } from '@playwright/test';

import testUserData from './testData/testUserData.json' assert { type: 'json' };
import type { UserMovie } from '../src/typedefs/UserMovie';
import { checkMovieListItemExistence } from './globalTestFunctions/globalTestFunctions';

const userMovies = testUserData ? testUserData as UserMovie[] : [] as UserMovie[];

test.describe('User movies', () => {
  test.beforeEach(async ({ page }) => {
    await setTabletViewport(page);
    await page.goto('/');
  });

  test('All user movies for test user are rendered on the page', async ({ page }) => {
    const promises = [];

    for (const movie of userMovies) => {
      promises.push(checkMovieListItemExistence(page, {
        movie,
        exists: true
      }));
    }

    await Promise.all(promises);
  });
});
