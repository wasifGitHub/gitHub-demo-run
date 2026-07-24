import { test } from '../fixtures/loadFixture';
import {Page} from '@playwright/test';
import Homepage from '../pages/homepage';
import LoginPage from '../pages/loginPage';

test('Login Swag Fixture', async ({ loginFixture,page }) => {
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
