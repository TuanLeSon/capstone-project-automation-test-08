import { test, expect } from "@playwright/test";
import { HomePage } from "../../../ui/pages/home/HomePage";

test('Banner carousel auto-slides', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
  
    const banner = home.banner;
  
    // Pre-condition
    await expect(banner.root).toBeVisible();
    await expect(banner.prevButton).toBeVisible();
    await expect(banner.nextButton).toBeVisible();
    // await expect(banner.hoverBanner());
    await expect(banner.bannerPlayIcon).toBeVisible();
    
  });