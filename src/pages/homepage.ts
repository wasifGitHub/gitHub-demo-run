import {expect,Locator,Page} from '@playwright/test';

export default class Homepage {
    protected page;
    public addToCartBtn;
    constructor(page:Page){
        this.page = page;
        this.addToCartBtn = page.getByRole('button',{name:'Add to cart'});
    }

    async addItemToCart(ele:Locator):Promise<void>{
        await ele.first().waitFor({state:'attached'});
        await ele.first().click()
        console.log('Item added to cart');
    }
}