import { test, expect } from '@playwright/test';
import { HomePage } from '../../../ui/pages/home/HomePage';
import { CinemaClusterSection } from '../../../ui/sections/CinemaClusterSection';

test('HOME_TC16 - Default Cinema Cluster is active', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();

  const cluster = home.cinemaCluster;
  await cluster.waitForLoaded();
  // await expect(cluster.clusterTabs).toHaveCountGreaterThan(0);
  await expect(cluster.clusterTab(0)).toHaveAttribute('aria-selected', 'true');
});


test('HOME_TC17 - Cinema panel updates when switching cinema cluster', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();

  const cluster = home.cinemaCluster;
  await cluster.waitForLoaded();

  // ---------- Arrange ----------
  // Capture initial cinema list snapshot
  const initialCinemaCount = await cluster.cinemaItems.count();
  await expect(initialCinemaCount).toBeGreaterThan(0);

  // ---------- Act ----------
  // Switch to another cluster tab (index 1)
  await cluster.selectCluster(1);

  // ---------- Assert ----------
  // New cluster tab should be active
  await expect(cluster.clusterTab(1)).toHaveAttribute('aria-selected', 'true');

  // Cinema panel still visible
  console.log(cluster.cinemaPanel.count());


  // Cinema list should be reloaded (not asserting exact data)
  await expect
    .poll(async () => await cluster.cinemaItems.count())
    .toBeGreaterThan(0);

  // Optional: detect DOM change (non-blocking)
  const updatedCinemaCount = await cluster.cinemaItems.count();
  expect(updatedCinemaCount).toBeGreaterThan(0);
});
test('HOME_TC18 - Cinema cluster content loads on tab click', async ({ page }) => {
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

test('HOME_TC19 - Showtime updates when cinema is selected', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
  
    const cluster = home.cinemaCluster;
    await cluster.waitForLoaded();
  
    // Pre-condition: ensure there are multiple cinemas
    const cinemaCount = await cluster.cinemaItems.count();
    console.log(`Cinema count: ${cinemaCount}`);
    expect(cinemaCount).toBeGreaterThan(1);
  
    // Act: select second cinema
    const targetCinema = cluster.cinemaItems.nth(1);
    await targetCinema.click();
  
    // Assert cinema active
    await expect(targetCinema).toHaveAttribute('aria-selected', 'true');
  
    // Assert showtime panel reacts
    await expect(cluster.showtimePanel).toBeVisible();
    await expect.poll(async () => {
        return await cluster.showtimeItems.count();
      }).toBeGreaterThan(0);
  });
  
  test('TC20 - Cinema tab shows correct showtime panel', async ({ page }) => {
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
  