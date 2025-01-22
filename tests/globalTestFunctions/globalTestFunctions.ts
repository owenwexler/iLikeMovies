import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import type { GenericExistenceCheckArgs } from '../../src/typedefs/GenericExistenceCheckArgs';

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

const checkErrorTextExistence = async (page: Page, args: GenericExistenceCheckArgs) => {
  await expect(page.locator('#error-text')).toBeVisible();
  await expect(page.locator('#error-text')).toContainText('We're sorry, something went wrong.');
}

export {
  setMobileViewport,
  setTabletViewport,
  setDesktopViewport,
  setGalaxyFoldViewport,
  checkErrorTextExistence
}
