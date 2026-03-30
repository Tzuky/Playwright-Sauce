import { Page } from '@playwright/test';
import { locators } from './locators';
import { expect } from '@playwright/test';

export class Actions {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addAddress(firstName: string, lastName: string, zip: string) {
    await this.page.locator(locators.firstNameField).fill(firstName);
    await this.page.locator(locators.lastNameField).fill(lastName);
    await this.page.locator(locators.zipCode).fill(zip);
  }

  async getLogoText() {
    return await this.page.locator(locators.logo).textContent();
  }

  async assertLogoText(expectedText: string) {
    const logoText = await this.getLogoText();
    expect(logoText).toBe(expectedText);
  }

  async clickAddToCart() {
    await this.page.locator(locators.jacketAddToCartButtons).click();
  }

  async getCartBadge() {
    return await this.page.locator(locators.shoppingCartBadge).textContent();
  }

  async assertCartBadge(expectedBadge: string) {
    const cartBadge = await this.getCartBadge();
    expect(cartBadge).toBe(expectedBadge);
  }

  async clickOnCart() {
    await this.page.locator(locators.shoppingCartContainer).click();
  }

  async clickCheckout() {
    await this.page.locator(locators.checkoutButton).click();
  }

  async clickContinueOrder() {
    await this.page.locator(locators.continueCheckoutButton).click();
  }

  async continueButton() {
    await this.page.locator(locators.continueCheckoutButton).click();
  }

  async finnishButton() {
    await this.page.locator(locators.orderFinnishButton).click();
  }

  async getCompleteOrderText() {
    return await this.page.locator(locators.completeOrderText).textContent();
  }

  async assertOrderComplete(expectHeaderText: string) {
    const headerText = await this.getCompleteOrderText();
    expect(headerText).toBe(expectHeaderText);
  }

  async sortItemsLohi() {
    await this.page.selectOption(locators.sortContainer, 'lohi');
  }

  async getErrorText() {
    return await this.page.locator(locators.lockedOutText).textContent();
  }

  async lockedUserLoginError(expectedText: string) {
    const errorText = await this.getErrorText();
    expect(errorText).toBe(expectedText);
  }

  async sortItemsFromLowToHigh() {
    const sortContainer = this.page.locator(locators.sortContainer);
    await sortContainer.selectOption({ label: 'Price (low to high)' });
  }

  async sortItemsFromHighToLow() {
    const sortContainer = this.page.locator(locators.sortContainer);
    await sortContainer.selectOption({ label: 'Price (high to low)' });
  }

  async sortItemsByAZ() {
    const sortContainer = this.page.locator(locators.sortContainer);
    await sortContainer.selectOption({ label: 'Name (A to Z)' });
  }

  async sortItemsByZA() {
    const sortContainer = this.page.locator(locators.sortContainer);
    await sortContainer.selectOption({ label: 'Name (Z to A)' });
  }

  async getItemsAndPrices() {
    return await this.page.locator(locators.itemsAndPrices).allTextContents();
  }

  async assertPriceSorting(order: 'asc' | 'desc') {
    const pricesText = await this.getItemsAndPrices();
    const numericPrices = pricesText.map(price => parseFloat(price.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => (order === 'asc' ? a - b : b - a));
    expect(numericPrices).toEqual(sortedPrices);
  }

  async getItemNames() {
    return await this.page.locator(locators.itemNames).allTextContents();
  }

  async assertNameSorting(order: 'asc' | 'desc') {
    const names = await this.getItemNames();
    const sortedNames = [...names].sort((a, b) => (order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)));
    expect(names).toEqual(sortedNames);
  }
}
