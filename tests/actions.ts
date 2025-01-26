import { Page } from '@playwright/test';
import { locators } from './locators';

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

    async getLogoText() {
        return await this.page.locator(locators.logo).textContent()
    }

    async assertLogoText(expectedText: string) {
        const logoText = await this.getLogoText();
        if (logoText !== expectedText) {
            throw new Error('Logo text incorrect');
        }

    }

    
}