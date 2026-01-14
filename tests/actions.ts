import { Page } from '@playwright/test';
import { locators } from './locators';
import { expect } from '@playwright/test';

export class Actions {
    private page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }

    async addAddress(firstName: string, lastName: string, zip: string) {
    await this.page.locator(locators.firstNameField).fill(firstName)
    await this.page.locator(locators.lastNameField).fill(lastName)
    await this.page.locator(locators.zipCode).fill(zip)

    }

    async getLogoText() {
        return await this.page.locator(locators.logo).textContent()
    }

    async assertLogoText(expectedText: string) {
        const logoText = await this.getLogoText();
        if (logoText !== expectedText) {
            throw new Error('Logo Text Incorrect');
        }
        else console.log('Logo Correct')

    }

    async clickAddToCart() {
        await this.page.locator(locators.jacketAddToCartButtons).click()
    }

    async getCartBadge() {
        return await this.page.locator(locators.shoppingCartBadge).textContent()
    }

    async assertCartBadge(expectedBadge: string) {
        const cartBadge = await this.getCartBadge();
        if (cartBadge !== expectedBadge) {
            throw new Error('Badge is incorrect - Item not added to Cart')
        }
        else console.log('Badge Correct')
    }

    async clickOnCart() {
        await this.page.locator(locators.shoppingCartContainer).click()
    }

    async clickCheckout() {
        await this.page.locator(locators.checkoutButton).click()
    }

    async clickContinueOrder() {
        await this.page.locator(locators.continueCheckoutButton).click()
    }

    async continueButton() {
        await this.page.locator(locators.continueCheckoutButton).click()
    }

    async finnishButton() {
        await this.page.locator(locators.orderFinnishButton).click()
    }

    async getCompleteOrderText() {
        return await this.page.locator(locators.completeOrderText).textContent()
    }

    async assertOrderComplete(expectHeaderText: string) {
        const headerText = await this.getCompleteOrderText();
        if (headerText !== expectHeaderText) {
            throw new Error ('Order Not Completed')
        }
        else console.log('Order Complete Successfully')
    }

    async sortItemsLohi() {
        await this.page.selectOption(locators.sortContainer, 'lohi');
    }

    async sortItemsHilo() {
        await this.page.selectOption(locators.sortContainer, 'hilo');
    }

    async sortItemsAtoZ() {
        await this.page.selectOption(locators.sortContainer, 'az');
    }

    async sortItemsZtoA() {
        await this.page.selectOption(locators.sortContainer, 'za');
    }

    async getItemsAndPrices() {
        return await this.page.locator(locators.itemsAndPrices).allTextContents();
    }

    async assertPriceSorting(order: 'asc' | 'desc') {
        const pricesText = await this.getItemsAndPrices();
        
        // Extract numeric values from price strings
        const numericPrices = pricesText.map(price => parseFloat(price.replace('$', '')));
        const sortedPrices = [...numericPrices].sort((a, b) => order === 'asc' ? a - b : b - a);

        try {
            // Verify if prices are sorted correctly
            expect(numericPrices).toEqual(sortedPrices);
            console.log(`Price sorting verification passed for order: ${order}.`);
        } catch (error) {
            console.error(`Price sorting verification failed for order: ${order}. Prices are not sorted correctly.`);
            console.error("Extracted Prices:", numericPrices);
            console.error("Expected Sorted Prices:", sortedPrices);
            throw error; // Re-throw the error so the test fails
        }
    }

    async assertNameSorting(order: 'asc' | 'desc') {
        const names = await this.page.locator(locators.sortContainer).allTextContents();
        const sorted = [...names].sort((a, b) => order === 'asc' ? a.localeCompare(b) : b.localeCompare(a));
        expect(names).toEqual(sorted);
    }
}












