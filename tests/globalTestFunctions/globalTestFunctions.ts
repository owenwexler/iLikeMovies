import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import type { GenericExistenceCheckArgs } from '../../src/typedefs/GenericExistenceCheckArgs';
import type { Movie } from '../../src/typedefs/Movie';
import { formatTitleForId } from '../../src/helper/formatTitleForId';
import { getTruncatedGenres } from '../../src/helper/getTruncatedGenres';
import type { UserMovie } from '../../src/typedefs/UserMovie';

const setMobileViewport = async (page: Page) => {
  await page.setViewportSize({ width: 390, height: 844 });
  return;
}

const setTabletViewport = async (page: Page) => {
  await page.setViewportSize({ width: 820, height: 1180 });
  return;
}

const setDesktopViewport = async (page: Page) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  return;
}

const setGalaxyFoldViewport = async (page: Page) => {
  await page.setViewportSize({ width: 280, height: 653 });
  return;
}

interface AssertImageSrcArgs {
  id: string;
  src: string;
}

const assertImageSrc = async (page: Page, args: AssertImageSrcArgs) => {
  const { id, src } = args;
  const locator = page.locator(id);

  await expect(locator).toBeVisible();
  const actualSrc = await locator.getAttribute('src');

  await expect(actualSrc).toEqual(src);
}

interface CheckLocatorExistenceArgs extends GenericExistenceCheckArgs {
  locator: string;
  text?: string;
  role?: string;
}

const checkLocatorExistence = async (page: Page, args: CheckLocatorExistenceArgs) => {
  const { locator, text, role, exists } = args;
  if (exists) {
    await expect(page.locator(locator)).toBeVisible();
    if (text) {
      await expect(page.locator(locator)).toContainText(text);
    }

    if (role) {
      await expect(page.locator(locator)).toHaveRole(role);
  }
  } else {
    await expect(page.locator(locator)).not.toBeVisible();
  }
}
interface CheckMovieListItemExistenceArgs extends GenericExistenceCheckArgs {
  movie: Movie;
}

const checkMovieListItemExistence = async (page: Page, args: CheckMovieListItemExistenceArgs) => {
  const {
    movie,
    exists
  } = args;

  const {
    title,
    year,
    rated,
    runtime,
    genre,
    director,
    watched,
    userMovieId
  } = movie;

  const id = formatTitleForId(title);

  await checkLocatorExistence(page, {
    locator: `#movie-list-item-page-card-${id}`,
    exists
  });

  const imageId = `#movie-list-item-image-${id}`;
  await checkLocatorExistence(page, {
    locator: imageId,
    exists
  });

  if (exists) {
    await expect(page.getByAltText(title)).toBeVisible();
    await expect(page.getByAltText(title)).toHaveRole('img');
  }

  await checkLocatorExistence(page, {
    locator: `#movie-list-item-title-${id}`,
    text: title.length > 20 ? `${title.slice(0, 16)}...` : title,
    exists
  });

  await checkLocatorExistence(page, {
    locator: `#movie-list-item-year-${id}`,
    text: year,
    exists
  });

  await checkLocatorExistence(page, {
    locator: `#movie-list-item-rating-${id}`,
    text: rated,
    exists
  });

  await checkLocatorExistence(page, {
    locator: `#movie-list-item-genres-${id}`,
    text: getTruncatedGenres(genre),
    exists
  });

  await checkLocatorExistence(page, {
    locator: `#watched-button-${id}`,
    text: watched ? 'Watched' : 'To Watch',
    role: 'button',
    exists
  });

  const deleteMovieButtonId = `#delete-movie-${id}`
  await checkLocatorExistence(page, {
    locator: deleteMovieButtonId,
    text: 'DELETE THIS MOVIE',
    role: 'button',
    exists
  });
}

interface CheckMultipleUserMoviesArgs {
  movies: UserMovie[];
  exists: boolean;
}

const checkMultipleUserMovies = async (page: Page, args: CheckMultipleUserMoviesArgs) => {
  const { movies, exists } = args;

  const promises = [];

  for (const movie of movies) {
    promises.push(checkMovieListItemExistence(page, {
      movie,
      exists: true
    }));
  }

  await Promise.all(promises);
}

export {
  setMobileViewport,
  setTabletViewport,
  setDesktopViewport,
  setGalaxyFoldViewport,
  checkLocatorExistence,
  checkMovieListItemExistence,
  checkMultipleUserMovies,
  assertImageSrc
}
