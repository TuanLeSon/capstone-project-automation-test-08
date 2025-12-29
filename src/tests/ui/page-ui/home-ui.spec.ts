import { test, expect } from '@playwright/test';
import { HomePage } from '../../../ui/pages/home/HomePage';

test('HOME_01 - Home page loads successfully', async ({ page }) => {
  const home = new HomePage(page);

  await home.open();

  // Assert URL
  await expect(page).toHaveURL(/cybersoft\.edu\.vn/);

  // Assert header (landmark)
  await expect(home.topBar.root).toBeVisible();
});

test('HOME_02 - Banner section is visible', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();

  await expect(home.banner.root).toBeVisible();
});

test('HOME_03 - Movie list is visible', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();
  await home.showtime.waitForLoaded();

  await expect(home.showtime.root).toBeVisible();

  const movieCount = await home.showtime.movieCards.count();
  expect(movieCount).toBeGreaterThan(0);
});

test('HOME_TC14_TC15 - Cinema cluster section and tabs are visible', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();

  const cluster = home.cinemaCluster;

  // Section visible
  await cluster.waitForLoaded();

  // Tabs visible
  await expect.poll(async () => {
    return await cluster.clusterTabs.count();
  }).toBeGreaterThan(0);

});

test('HOME_TC21 - App section is visible and has valid CTA', async ({ page, context }) => {
  const home = new HomePage(page);
  await home.open();

  const app = home.appSection;

  // Assert section visible
  await expect(app.root).toBeVisible();

  // Assert visual elements
  await expect(app.imgSlider).toBeVisible();
  await expect
    .poll(async () => await app.appButtons.count())
    .toBeGreaterThan(0);

  // Click first CTA
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    app.appButtons.first().click(),
  ]);

  // Assert external navigation intent
  expect(newPage.url()).toMatch(/apple|google|store|play/i);
});



test('Homepage → click "Showtime" scrolls to showtime section', async ({ page }) => {
  const home = new HomePage(page);

  // 1. Mở homepage
  await home.open();
  await home.showtime.waitForLoaded();
  await expect(home.showtimeHeader).toBeAttached();

  const firstPosition = await home.showtimeHeader.evaluate(el => el.getBoundingClientRect().top);
  // console.log("Before scroll:", firstPosition);

  expect(firstPosition).toBeGreaterThan(66);

  // Click menu
  await home.topBar.showtimeBtn.click();

  // Wait for scroll behavior
  await page.waitForFunction(() => window.scrollY > 0);

  const afterPosition = await home.showtimeHeader.evaluate(el => el.getBoundingClientRect().top);
  // console.log("After scroll:", afterPosition);

  expect(afterPosition).toBeLessThanOrEqual(61);
});

test('Homepage → click "CinemaCluster" scrolls to cinema cluster section', async ({ page }) => {
  const home = new HomePage(page);

  // 1. Mở homepage
  await home.open();
  await home.cinemaCluster.waitForLoaded();
  await expect(home.cinemaClusterHeader).toBeAttached();

  const firstPosition = await home.cinemaClusterHeader.evaluate(el => el.getBoundingClientRect().top);
  // console.log("Before scroll:", firstPosition);

  expect(firstPosition).toBeGreaterThan(66);

  // Click menu
  await home.topBar.cinemaClusterBtn.click();

  // Wait for scroll behavior
  await page.waitForFunction(() => window.scrollY > 0);

  const afterPosition = await home.cinemaClusterHeader.evaluate(el => el.getBoundingClientRect().top);
  // console.log("After scroll:", afterPosition);

  expect(afterPosition).toBeLessThanOrEqual(61);
});

test('Homepage → click "News" scrolls to News section', async ({ page }) => {
  const home = new HomePage(page);

  // 1. Mở homepage
  await home.open();
  await home.newsSection.waitForLoaded();
  await expect(home.newsHeader).toBeAttached();

  const firstPosition = await home.newsHeader.evaluate(el => el.getBoundingClientRect().top);
  // console.log("Before scroll:", firstPosition);

  expect(firstPosition).toBeGreaterThan(66);

  // Click menu
  await home.topBar.newsBtn.click();

  // Wait for scroll behavior
  await page.waitForFunction(() => window.scrollY > 0);

  const afterPosition = await home.newsHeader.evaluate(el => el.getBoundingClientRect().top);
  // console.log("After scroll:", afterPosition);

  expect(afterPosition).toBeLessThanOrEqual(61);
});

test('Homepage → click "AppSection" scrolls to App section', async ({ page }) => {
  const home = new HomePage(page);

  // 1. Mở homepage
  await home.open();
  await home.newsSection.waitForLoaded();
  await expect(home.appSectionHeader).toBeAttached();

  const firstPosition = await home.appSectionHeader.evaluate(el => el.getBoundingClientRect().top);
  // console.log("Before scroll:", firstPosition);

  expect(firstPosition).toBeGreaterThan(66);

  // Click menu
  await home.topBar.appBtn.click();

  // Wait for scroll behavior
  await page.waitForFunction(() => window.scrollY > 0);

  const afterPosition = await home.appSectionHeader.evaluate(el => el.getBoundingClientRect().top);
  // console.log("After scroll:", afterPosition);

  expect(afterPosition).toBeLessThanOrEqual(61);
});