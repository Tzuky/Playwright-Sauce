import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly logo: Locator;
  readonly jacketAddToCartButton: Locator;
  readonly shoppingCartContainer: Locator;
  readonly shoppingCartBadge: Locator;
  readonly sortContainer: Locator;
  readonly itemPrices: Locator;
  readonly itemNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('.app_logo');
    this.jacketAddToCartButton = page.locator('#add-to-cart-sauce-labs-fleece-jacket');
    this.shoppingCartContainer = page.locator('#shopping_cart_container');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sortContainer = page.locator('[data-test="product-sort-container"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.itemNames = page.locator('.inventory_item_name');
  }

  async addJacketToCart() {
    await this.jacketAddToCartButton.click();
  }

  async goToCart() {
    await this.shoppingCartContainer.click();
  }

  async sortLowToHigh() {
    await this.sortContainer.selectOption({ label: 'Price (low to high)' });
  }

  async sortHighToLow() {
    await this.sortContainer.selectOption({ label: 'Price (high to low)' });
  }

  async sortAZ() {
    await this.sortContainer.selectOption({ label: 'Name (A to Z)' });
  }

  async sortZA() {
    await this.sortContainer.selectOption({ label: 'Name (Z to A)' });
  }

  async getNumericPrices(): Promise<number[]> {
    const texts = await this.itemPrices.allTextContents();
    return texts.map(price => parseFloat(price.replace('$', '')));
  }

  async getAllItemNames(): Promise<string[]> {
    return await this.itemNames.allTextContents();
  }
}
