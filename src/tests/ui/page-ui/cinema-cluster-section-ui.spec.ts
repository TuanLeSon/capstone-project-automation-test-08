import { test, expect } from '@playwright/test';
import { HomePage } from '../../../ui/pages/home/HomePage';
import { CinemaClusterSection } from '../../../ui/sections/CinemaClusterSection';

test('Default Cinema Cluster is active', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();
  await home.waitForLoaded();
  const cluster = home.cinemaCluster;
  await cluster.waitForLoaded();
  // await expect(cluster.clusterTabs).toHaveCountGreaterThan(0);
  await expect(cluster.clusterTab(0)).toHaveAttribute('aria-selected', 'true');
});


test('Cinema panel updates when switching cinema cluster', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();
  home.waitForLoaded();
  home.topBar.cinemaClusterBtn.click();
  await expect.poll(async () =>
    await home.cinemaClusterHeader.evaluate(el => el.getBoundingClientRect().top)
  ).toBeLessThanOrEqual(61);
  

  // ---------- Arrange ----------
  // Capture initial cinema list snapshot
  const initialCinemaCount = await home.cinemaCluster.cinemaItems.count();
  expect(initialCinemaCount).toBeGreaterThan(0);

  // ---------- Act ----------
  // Switch to another cluster tab (index 1)
  await home.cinemaCluster.selectCluster(1);

  // ---------- Assert ----------
  // New cluster tab should be active
  await expect(home.cinemaCluster.clusterTab(1)).toHaveAttribute('aria-selected', 'true');

  // Cinema list should be reloaded (not asserting exact data)
  await expect
    .poll(async () => await home.cinemaCluster.cinemaItems.count())
    .toBeGreaterThan(0);

  // Optional: detect DOM change (non-blocking)
  const updatedCinemaCount = await home.cinemaCluster.cinemaItems.count();
  expect(updatedCinemaCount).toBeGreaterThan(0);
});
test('Cinema cluster content loads on tab click', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();

  const cluster = home.cinemaCluster;
  await cluster.waitForLoaded();

  // --- Arrange ---
  const initialActiveTab = cluster.activeClusterTab;
  await expect(initialActiveTab).toBeVisible();

  // ensure we have more than 1 cluster
  const tabCount = await cluster.clusterTabs.count();
  test.skip(tabCount < 2, 'Only one cinema cluster available');

  // --- Act ---
  await cluster.switchToTab(1);

  // --- Assert ---
  // 1. cluster tab switched
  const newActiveTab = cluster.activeClusterTab;
  await expect(newActiveTab).toBeVisible();
  await expect(cluster.activeClusterTab).toHaveAttribute(
    'aria-selected',
    'true'
  );


  // 2. cinema panel reacts
  await expect(cluster.cinemaPanel).toBeVisible();

  // optional: cinema items exist (not asserting >0 strictly)
  await expect(cluster.cinemaItems.first()).toBeVisible();

  // 3. showtime panel visible
  await expect(cluster.showtimePanel).toBeVisible();
});

test('Showtime updates when cinema is selected', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();
  await home.waitForLoaded();

  const cluster = home.cinemaCluster;
  await cluster.waitForLoaded();
  await home.cinemaCluster.waitForLoaded();

  await home.topBar.cinemaClusterBtn.click();

  await expect.poll(async () =>
    await home.cinemaClusterHeader.evaluate(el => el.getBoundingClientRect().top)
  ).toBeLessThanOrEqual(61);
  
  // Pre-condition: ensure there are multiple cinemas
  const cinemaCount = await home.cinemaCluster.cinemaItems.count();
  console.log(`Cinema count: ${cinemaCount}`);
  expect(cinemaCount).toBeGreaterThan(1);

  // Act: select second cinema
  const targetCinema = home.cinemaCluster.cinemaItems.nth(1);
  await targetCinema.click();

  // Assert cinema active
  await expect(targetCinema).toHaveAttribute('aria-selected', 'true');

  // Assert showtime panel reacts
  await expect(cluster.showtimePanel).toBeVisible();
  await expect.poll(async () => {
    return await cluster.showtimeItems.count();
  }).toBeGreaterThan(0);
});

test('Cinema tab shows correct showtime panel', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();
  const cinemaSection = new CinemaClusterSection(page);

  await cinemaSection.waitForLoaded();

  // Action
  await cinemaSection.secondCinemaItem.click();

  // Assert UI
  await expect(cinemaSection.activeShowtimePanel).toBeVisible();
  await expect(cinemaSection.activeShowtimePoster).toBeVisible();
});
