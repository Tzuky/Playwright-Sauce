import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';
import { Actions } from './actions';

let actions: Actions;


const baseUrl = 'https://www.saucedemo.com/';
const standartUser = 'standard_user';
const pass = 'secret_sauce';

test.beforeEach (async ({page}) => {
  await page.goto(baseUrl)
})

test('log into page', async ({ page }) => {
  

  const actions = new Actions(page);

  await actions.logIn(standartUser, pass);
  await actions.assertLogoText('Swag Labs');
  
});

test('add item to cart', async ({page}) => {

  const actions = new Actions(page);
  await actions.logIn(standartUser, pass);
  await actions.clickAddToCart();
  await actions.assertCartBadge('1');
  
  
} )

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
