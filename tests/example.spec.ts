import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';
import { Actions } from './actions';

let actions: Actions;


const baseUrl = 'https://www.saucedemo.com/';
const standartUser = 'standard_user';
const pass = 'secret_sauce';

const logo = 'Swag Labs'
const badge = '1'

const addressFirstName = '4iki';
const addressLastName = 'Riki';
const addressZip = '1234';

const completeOrderHeaderText = 'Thank you for your order!'

test.beforeEach (async ({page}) => {
  await page.goto(baseUrl)
})

test.afterEach(async ({ page }) => {
  console.log('Test completed');
});

test('log into page', async ({ page }) => {
  

  const actions = new Actions(page);

  await actions.logIn(standartUser, pass);
  await actions.assertLogoText(logo);
  
});

test('add item to cart', async ({page}) => {

  const actions = new Actions(page);
  await actions.logIn(standartUser, pass);
  await actions.clickAddToCart();
  await actions.assertCartBadge(badge);
  
  
} );

test('finalize an order', async({page}) => {
  const actions = new Actions(page);
  await actions.logIn(standartUser, pass);
  await actions.clickAddToCart();
  await actions.clickOnCart();
  await actions.clickCheckout();
  await actions.addAddress(addressFirstName,addressLastName,addressZip);
  await actions.clickContinueOrder();
  await actions.finnishButton();
  await actions.assertOrderComplete(completeOrderHeaderText);

})
