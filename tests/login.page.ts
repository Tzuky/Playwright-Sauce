import { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;

    // Locators
    private userField = '#user-name';
    private passField = '#password';
    private loginButton = '#login-button';
    private lockedOutText = '[data-test="error"]';

    constructor(page: Page) {
        this.page = page;
    }

    async logIn(username: string, password: string) {
        await this.page.locator(this.userField).fill(username);
        await this.page.locator(this.passField).fill(password);
        await this.page.locator(this.loginButton).click();
    }

    async getErrorText() {
        return await this.page.locator(this.lockedOutText).textContent();
    }

    async lockedUserLoginError(expectedText: string) {
        const errorText = await this.getErrorText();
        if (errorText !== expectedText) {
            throw new Error('Error text incorrect');
        } else {
            console.log('Error Text Correct');
        }
    }
}