import { Page, Locator, expect } from '@playwright/test';

export class CinemaClusterSection {
    constructor(private readonly page: Page) { }
    // get landmark() { return this.page.locator('section[aria-label="Cụm rạp"]'); }
    get root() { return this.page.locator('.MuiTabs-root').first(); }

  /* ========== CLUSTER TABS ========== */
  get clusterTabList(): Locator {
    return this.root.locator('[role="tablist"]');
  }
  
  get clusterTabs(): Locator {
    return this.clusterTabList.locator('[role="tab"]');
  }
  
  get activeClusterTab(): Locator {
    return this.root.locator('[role="tab"][aria-selected="true"]');
  }
  

  clusterTab(index: number): Locator {
    return this.clusterTabs.nth(index);
  }

  private visibleTabPanels(): Locator {
    return this.root
      .locator('xpath=following-sibling::*[@role="tabpanel" and not(@hidden)]');
  }
  
  get cinemaPanel(): Locator {
    return this.visibleTabPanels().first();
  }
  
  get showtimePanel(): Locator {
    return this.visibleTabPanels().nth(1);
  }
  

  get cinemaItems(): Locator {
    return this.cinemaPanel.locator('[role="tab"]')
  }

  get secondCinemaItem(): Locator {
    return this.cinemaItems.nth(1);
  }

  get activeShowtimePanel(): Locator {
    return this.showtimePanel.locator('.MuiBox-root');
  }

  get showtimeItems(): Locator {
    return this.showtimePanel.locator('a[href^="/purchase/"]');
  }

  /* ========== ACTIONS ========== */
  async selectCluster(index: number) {
    const tab = this.clusterTab(index);
    await tab.click();
    await expect(tab).toHaveAttribute('aria-selected', 'true');
  }

  get activeShowtimePoster(): Locator {
    return this.activeShowtimePanel.locator('img').first();
  }
  
      
    async waitForLoaded() {
      await expect(this.clusterTabList).toBeVisible();
      await expect(this.cinemaPanel).toBeVisible();
    }



    async switchToTab(index: number) {
        const tab = this.clusterTab(index);
        await tab.click();
        await expect(tab).toHaveAttribute('aria-selected', 'true');
      }
}
