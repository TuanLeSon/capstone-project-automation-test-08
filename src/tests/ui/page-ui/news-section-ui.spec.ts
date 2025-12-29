import { test, expect } from "@playwright/test";
import { HomePage } from "../../../ui/pages/home/HomePage";

test('HOME_TC22 - Expand/Collapse News section', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
  
    const news = home.newsSection;
    const panelIndex = 0; // panel đầu tiên – nếu cần sẽ loop sau
  
    // Lúc đầu thu gọn → card ít hơn
    const initialCount = await news.getCardCount(panelIndex);
  
    // Expand → số lượng tăng (đầu đủ list)
    await news.expand();
    const expandedCount = await news.getCardCount(panelIndex);
    expect(expandedCount).toBeGreaterThan(initialCount);
  
    // Collapse → return lại ban đầu
    await news.collapse(panelIndex);
    const collapsedCount = await news.getCardCount(panelIndex);
    expect(collapsedCount).toBe(initialCount);
  });
  
  test('HOME_TC23 - Clicking news card opens detail page in new tab', async ({ context, page }) => {
    const home = new HomePage(page);
    await home.open();
    const panelIndex = 0;
    const news = home.newsSection;
    await news.waitForLoaded();
  
    // Step 1: ensure có card
    await news.expand();
    const cardCount = await news.newsCards(panelIndex).count();
    expect(cardCount).toBeGreaterThan(0);
  
    // Step 2: click card (image hoặc title)
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),         // wait new tab
      news.cardTitles(0).first().click()             // hoặc news.cardImage(0).click()
    ]);
  
    // Step 3: assert page opened đúng
    await newPage.waitForLoadState();
    // await expect(newPage).toHaveURL(/http/); // vì external, check pattern thôi
  
    console.log(`Opened external page: ${await newPage.url()}`);
  });

  test ('expand then switch tab', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    const news = home.newsSection;
    const panelIndex = 0;

    // Expand first
    await news.expand();
    const expandedCount = await news.getCardCount(panelIndex);
    console.log(`Expanded card count: ${expandedCount}`);

    // Switch tab
    const initialActiveTab = news.panel(0);
    await expect(initialActiveTab).toHaveAttribute('aria-selected', 'true');

    // Switch to second tab
    await news.switchPanel(1);

    // Assert tab switched
    const newTabPanel = news.panel(2);
    await expect(newTabPanel).toHaveAttribute('aria-selected', 'true');
    await expect(news.toggleBtn()).toHaveText(/XEM THÊM/i); // vẫn ở trạng thái expanded
  });