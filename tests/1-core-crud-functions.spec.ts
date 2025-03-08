import { test, expect } from '@playwright/test';
import { setMobileViewport } from './globalTestFunctions/globalTestFunctions';

test.describe('Core CRUD functions', () => {
  test.beforeEach(async ({ page }) => {
    await setMobileViewport(page);
    await page.goto('/');
  });

  test('adding a movie that is in OMDB produces the expected results', async ({ page }) => {
    await page.locator('#add-movie-input').click();
    await page.locator('#add-movie-input').fill('Earth');
    await page.getByRole('button', { name: 'Add Movie' }).click();
    await expect(page.getByRole('heading', { name: 'Earth' })).toBeVisible();
    // check that Earth + all other user movies are visible
  });

  test('the added movie persists after a reload and can be updated from unwatched to watched with expected results', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Earth' })).toBeVisible();
    // check that Earth + all other user movies are visible
    await page.locator('#movie-filter-watched').check();
    await expect(page.getByRole('heading', { name: 'Earth' })).not.toBeVisible();
    await page.locator('#movie-filter-all').check();
    await expect(page.getByRole('heading', { name: 'Earth' })).toBeVisible();
    await page.locator('#watched-button-earth').click();
    await page.locator('#movie-filter-watched').check();
    // check that all watched movies + Earth are visible
    await page.locator('#movie-filter-unwatched').check();
    await expect(page.getByRole('heading', { name: 'Earth' })).not.toBeVisible();

    await page.locator('#movie-filter-all').check();
  });

  test('the delete dialog for the added movie works as expected and the added movie can be deleted', async ({ page }) => {
    await page.locator('#delete-movie-earth').click();
    await expect(page.getByRole('heading', { name: 'Are you sure?' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Yes' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'No' })).toBeVisible();
    await page.getByRole('button', { name: 'No' }).click();
    // assert that the delete dialog disappears after "No" is clicked
    await page.locator('#delete-movie-earth').click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(page.getByRole('heading', { name: 'Earth' })).not.toBeVisible();
    // check that other movies are all visible
  });

  test('adding a movie that is not in OMDB produces the expected results', async ({ page }) => {
    await page.locator('#add-movie-input').click();
    await page.locator('#add-movie-input').fill('This Movie Is Also Not In OMD');
    await page.getByRole('button', { name: 'Add Movie' }).click();
    await expect(page.getByRole('heading', { name: 'This Movie Is Al...' })).toBeVisible();
    // check that "This Movie Is Also Not In OMDB" plus all other movies are shown and that the new movie is unwatched by default
    await page.locator('#delete-movie-this-movie-is-also-not-in-omdb').click();
    await page.getByRole('button', { name: 'Yes' }).click();
  });
});
