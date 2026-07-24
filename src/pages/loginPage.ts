import {expect, Page} from '@playwright/test';
import Homepage from './homepage';

export default class LoginPage {
    private username;
    private password;
    protected loginBtn;
    // public authFile = 'src/config/auth.json';
    constructor(protected page: Page){
        this.page = page;
        this.username = page.getByRole('textbox',{name:'Username'});
        this.password = page.getByRole('textbox',{name:'Password'});
        this.loginBtn = page.getByRole('button',{name:'Login'});
    }

    async navigateToPage(): Promise<void>{
        await this.page.goto(`https://www.saucedemo.com/`);
        expect(this.username).toBeVisible();
        await expect(this.page).toHaveTitle(/Swag Labs/);
        console.log('Login Page loaded successfully')
    }

    async enterCredentials(username:string,password:string){
        await this.username.first().waitFor({state:'visible'})
        await this.username.fill(username);
        console.log(`Actual: "${await this.username.inputValue()}"`);
        console.log(`Expected: "${username}"`);
        await expect(this.username).toHaveValue(username,{timeout:5000});
        await this.password.fill(password);
        await expect(this.password).toHaveValue(password,{timeout:5000});
    }

    async clickLoginAndGoToHomePage(): Promise<void>{
        await this.loginBtn.first().click().catch((error) => {
            console.log(error);
        }).then(()=>{console.log('Clicked Login')});
        await expect(this.page).toHaveURL(/inventory/)
        // await this.page.context().storageState({path:this.authFile});
        console.log('Homepage Loaded')
    }

    async returnClickLoginAndGoToHomePage(): Promise<Homepage>{
        await this.loginBtn.first().click().catch((error) => {
            console.log(error);
        }).then(()=>{console.log('Clicked Login')});
        await expect(this.page).toHaveURL(/inventory/)
        console.log('Homepage Loaded')
        const homePage = new Homepage(this.page);
        return homePage;
    }
}