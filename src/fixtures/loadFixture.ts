import {test as base, Page} from '@playwright/test';
import LoginPage from '../pages/loginPage';

type LoginFixture = {
    loginFixture : Page
}
export const test = base.extend<LoginFixture>({
    loginFixture: async({page},use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToPage();
        await loginPage.enterCredentials('standard_user','secret_sauce');
        await loginPage.clickLoginAndGoToHomePage();
        await use(page);
    }
})