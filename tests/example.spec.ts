import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

const standardUser = 'standard_user';
const lockedOutUser = 'locked_out_user';
const pass = 'secret_sauce';

const logoText = 'Swag Labs';
const badgeCount = '1';

const addressFirstName = '4iki';
const addressLastName = 'Riki';
const addressZip = '1234';
const completeOrderHeaderText = 'Thank you for your order!';
const lockedErrorText = 'Epic sadface: Sorry, this user has been locked out.';

test.beforeEach(async ({ page }) => {
  // baseUrl is defined in playwright.config.ts
  await page.goto('/');
});

test.describe('Authentication', () => {
  test('log into page successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    
    await loginPage.logIn(standardUser, pass);
    await expect(inventoryPage.logo).toHaveText(logoText);
  });

  test('locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.logIn(lockedOutUser, pass);
    await expect(loginPage.errorMessage).toHaveText(lockedErrorText);
  });
});

test.describe('Inventory & Sorting', () => {
  test('add item to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    
    await loginPage.logIn(standardUser, pass);
    await inventoryPage.addJacketToCart();
    
    await expect(inventoryPage.shoppingCartBadge).toHaveText(badgeCount);
  });

  test('sort Low to High', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    
    await loginPage.logIn(standardUser, pass);
    await inventoryPage.sortLowToHigh();
    
    const prices = await inventoryPage.getNumericPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test('sort High to Low', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    
    await loginPage.logIn(standardUser, pass);
    await inventoryPage.sortHighToLow();
    
    const prices = await inventoryPage.getNumericPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  });

  test('sort Z to A', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    
    await loginPage.logIn(standardUser, pass);
    await inventoryPage.sortZA();
    
    const names = await inventoryPage.getAllItemNames();
    const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sortedNames);
  });
});

test.describe('Checkout Flow', () => {
  test('finalize an order', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    
    await loginPage.logIn(standardUser, pass);
    await inventoryPage.addJacketToCart();
    await inventoryPage.goToCart();
    
    await cartPage.proceedToCheckout();
    await checkoutPage.fillAddressAndContinue(addressFirstName, addressLastName, addressZip);
    await checkoutPage.finishOrder();
    
    await expect(checkoutPage.completeOrderHeader).toHaveText(completeOrderHeaderText);
  });
});
