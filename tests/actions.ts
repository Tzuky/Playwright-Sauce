import { Page } from '@playwright/test';
import { locators } from './locators';
import { expect } from '@playwright/test';

export class Actions {
    private page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }

    async logIn(username: string, password: string) {

    await this.page.locator(locators.userField).fill(username)
    await this.page.locator(locators.passField).fill(password)
    await this.page.locator(locators.loginButton).click();

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
            throw new Error('Logo text incorrect');
        }

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
    }


    async getErrorText() {
        return await this.page.locator(locators.lockedOutText).textContent()
    }

    async lockedUserLoginError(expectedText: string) {
        const errorText = await this.getErrorText();
        if (errorText !== expectedText) {
            throw new Error('Logo text incorrect');
        }

    }

    async sortItemsLohi() {
        await this.page.selectOption(locators.sortContainer, 'lohi');
    }

    async getItemsAndPrices() {
        return await this.page.locator(locators.itemsAndPrices).allTextContents();
    }

    async assertPriceSorting() {
        const pricesText = await this.getItemsAndPrices();
        
        // Extract numeric values from price strings
        const numericPrices = pricesText.map(price => parseFloat(price.replace('$', '')));
        const sortedPrices = [...numericPrices].sort((a, b) => a - b);

        try {
            // Verify if prices are sorted correctly
            expect(numericPrices).toEqual(sortedPrices);
            console.log("✅ Price sorting verification passed.");
        } catch (error) {
            console.error("❌ Price sorting verification failed. Prices are not sorted correctly.");
            console.error("Extracted Prices:", numericPrices);
            console.error("Expected Sorted Prices:", sortedPrices);
            throw error; // Re-throw the error so the test fails
        }
    }
}



    

    

    



    
