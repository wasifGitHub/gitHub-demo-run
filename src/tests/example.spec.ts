import { test } from '../fixtures/loadFixture';
import {expect, Page} from '@playwright/test';
import Homepage from '../pages/homepage';
import LoginPage from '../pages/loginPage';
import tags from '../data/tags.json';
import { printSummary, getStats,getSuites } from '../utils/reportUtil';
// import * as allure from "allure-js-commons";

test.skip('Login Swag Fixture', async ({ loginFixture,page }) => {
  loginFixture;
  const homePage = new Homepage(page)
  await homePage.addItemToCart(homePage.addToCartBtn);
  await page.getByRole('button',{name:'Remove'}).first().waitFor({state:'visible'});
  await page.waitForTimeout(3000);

});

const authFile:string = 'src/config/auth.json';
test.skip('Login Swag POM', async({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToPage();
  await loginPage.enterCredentials('standard_user','secret_sauce');
  const homePage = await loginPage.returnClickLoginAndGoToHomePage();
  await page.context().storageState({path:authFile});
  homePage.addItemToCart(homePage.addToCartBtn);
});

// let page:Page;
// test.describe.serial('run login swag in serial', ()=> {
//   test.beforeAll(async ({browser}) => {
//     const context = await browser.newContext({storageState:authFile})
//     page = await context.newPage();
//     await page.goto(`https://www.saucedemo.com/inventory.html`);
//   });

//   test('Add to cart', async () => {
//     await page.getByRole('button',{name:'Add to cart'}).first().click();
//     await page.getByRole('button',{name:'Remove'}).first().waitFor({state:'visible'});
//   });

//   test('logout', async () => {
//     await page.locator(`#react-burger-menu-btn`).first().click();
//     await page.getByRole('link',{name:'Logout'}).first().click();
//     await page.getByRole('button',{name:'Login'}).first().waitFor({state:'visible'});
//   });
// });

test('Mock API UI', async({page}) => {
  page.route('**/*/api/tags', async (route) => {
    // Print original response
    const response = await route.fetch()
    const body = await response.json();
    // console.log('Original response: ',body);

    // Override respponse
    if(route.request().method().includes('GET')){
      await route.fulfill({
        body: JSON.stringify(tags)
      });
      // console.log(`Changed response`,tags);
    } else {
      await route.continue();
    }
  });

  // We can also use waitForResponse to access the api 
  const responsePromise = page.waitForResponse(resp => resp.url().includes('api/tags') && resp.status() === 200);
  // waitForRequest is used to check client request payload , headers or method
  const requestPromise = page.waitForRequest('**/*/api/tags');
  await page.goto(`https://conduit.bondaracademy.com/`);
  await expect(page.locator(`//div[@class='tag-list']`)).toBeVisible();
  const resp = await (await responsePromise).json();
  console.log(resp);
  const req =  await (await requestPromise).postData()
  console.log(req);

  // What are the diff condition used here
  // method()       = GET, POST, PUT, DELETE
  // url()          = which API/page/file
  // resourceType() = document, xhr, fetch, image, script, stylesheet, font

  // 1. Method condition
  // if (route.request().method() === "POST") {}

  // 2. URL contains API path
  // if (route.request().url().includes("/api/users")) {}

  // 3. Resource type
  // if (route.request().resourceType() === "image") {}

});

test('Reporting', async({}) => {
  console.log('Printing report summary');
  printSummary();
  console.log('Get stats:', getStats());

})