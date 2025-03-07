import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

import testUserData from './testData/testUserData.json' assert { type: 'json' };
import type { UserMovie } from '../src/typedefs/UserMovie';
import { setMobileViewport, checkMovieListItemExistence, checkMultipleUserMovies } from './globalTestFunctions/globalTestFunctions';

const userMovies = testUserData ? testUserData as UserMovie[] : [] as UserMovie[];
const buttonIds = ['#movie-filter-all', '#movie-filter-watched', '#movie-filter-unwatched'];

const buttonShouldBeChecked = async (page: Page, args: { id: '#movie-filter-all' | '#movie-filter-watched' | '#movie-filter-unwatched' }) => {
  const { id } = args;
  const uncheckedButtonIds = buttonIds.filter(buttonId => buttonId !== id);

  await expect(page.locator(id)).toBeChecked();

  const promises = [];

  for (const uncheckedButtonId of uncheckedButtonIds) {
    promises.push(expect(page.locator(uncheckedButtonId)).not.toBeChecked());
  }
  
  await Promise.all(promises);
}

test.describe('Filters', () => {
  test.beforeEach(async ({ page }) => {
    await setMobileViewport(page);
    await page.goto('/');
  });

  test('all static filter elements exist', async ({ page }) => {
    await expect(page.locator('#movie-filter-all')).toBeVisible();
    await expect(page.locator('#label-all')).toBeVisible();
    await expect(page.locator('#label-all')).toContainText('All Movies');
    await expect(page.locator('#movie-filter-watched')).toBeVisible();
    await expect(page.locator('#label-watched')).toBeVisible();
    await expect(page.locator('#label-watched')).toContainText('Watched');
    await expect(page.locator('#movie-filter-unwatched')).toBeVisible();
    await expect(page.locator('#label-unwatched')).toBeVisible();
    await expect(page.locator('#label-unwatched')).toContainText('To Watch');
    await expect(page.locator('#label-all')).toContainText('All Movies');
  });

  test('the app starts with filters set to all movies and all current user movies are shown', async ({ page }) => {
    await buttonShouldBeChecked(page, { id: '#movie-filter-all' });

    await checkMultipleUserMovies(page, {
      movies: userMovies,
      exists: true
    });
  });

  test('clicking the radio button for watched movies causes only watched movies to be shown', async ({ page }) => {
    await page.locator('#movie-filter-watched').click();
    await buttonShouldBeChecked(page, { id: '#movie-filter-watched' });

    await checkMultipleUserMovies(page, {
      movies: userMovies.filter(movie => movie.watched === true),
      exists: true
    });
  });
  
  test('clicking the radio button for unwatched movies causes only unwatched movies to be shown', async ({ page }) => {
    await page.locator('#movie-filter-unwatched').click();
    await buttonShouldBeChecked(page, { id: '#movie-filter-watched' });
 
    await checkMultipleUserMovies(page, {
      movies: userMovies.filter(movie => movie.watched === false),
      exists: true
    });
  });
});
