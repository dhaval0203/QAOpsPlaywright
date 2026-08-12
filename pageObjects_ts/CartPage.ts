import { expect, Locator, Page } from "@playwright/test";

export class CartPage
{
    page : Page;
    cartProducts : Locator;
    checkout : Locator;
    
    constructor(page: Page)
    {
        this.page = page;
        this.cartProducts = page.locator("div li").first();        
        this.checkout = page.locator("text=Checkout");
    }
    
    async VerifyProductIsDisplayed(productName: string)
    {   
        await this.cartProducts.waitFor();
        const bool =await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }
    
    async Checkout()
    {
        await this.checkout.click();
    }

    getProductLocator(productName: string)
    {
        return  this.page.locator("h3:has-text('"+productName+"')");
    }

}

//module.exports = { CartPage }