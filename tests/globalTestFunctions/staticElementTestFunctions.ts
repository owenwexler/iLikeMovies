import type { Page } from '@playwright/test';
import { checkLocatorExistence, assertImageSrc } from './globalTestFunctions';
import { GenericExistenceCheckArgs } from '../../src/typedefs/GenericExistenceCheckArgs.ts';

const checkLogoExistence = async (page: Page, args: GenericExistenceCheckArgs) => {
  const { exists } = args;

  await checkLocatorExistence(page, {
    locator: '#logo',
    exists
  });

  await assertImageSrc(page, {
    id: '#logo',
    src: '/static/images/iLikeMovies-logo.svg'
  });
}

const checkAddMovieFormExistence = async (page: Page, args: GenericExistenceCheckArgs) => {
  const { exists } = args;

  await checkLocatorExistence(page, {
    locator: '#add-movie-form',
    exists
  });
  
  await checkLocatorExistence(page, {
    locator: '#add-movie-input',
    exists,
    role: 'textbox'
  });

  await checkLocatorExistence(page, {
    locator: '#add-movie-submit',
    exists,
    role: 'button'
  });
}

const checkFilterFormExistence = async (page: Page, args: GenericExistenceCheckArgs) => {
  const { exists } = args;

  const allButtonId = '#movie-filter-all';
  await checkLocatorExistence(page, {
    locator: allButtonId,
    exists,
    role: 'radio'
  });
  
  const watchedButtonId = '#movie-filter-watched';
  await checkLocatorExistence(page, {
    locator: watchedButtonId,
    exists,
    role: 'radio'
  });
  
  const unwatchedButtonId = '#movie-filter-unwatched';
  await checkLocatorExistence(page, {
    locator: unwatchedButtonId,
    exists,
    role: 'radio'
  });
}

const checkErrorTextExistence = async (page: Page, args: GenericExistenceCheckArgs) => {
  await checkLocatorExistence(page, {
    locator: '#error-text',
    text: 'We\'re sorry, something went wrong.',
    exists 
  });
}

export {
  checkLogoExistence,
  checkErrorTextExistence,
  checkAddMovieFormExistence,
  checkFilterFormExistence
}
