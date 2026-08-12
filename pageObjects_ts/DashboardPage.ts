import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage
{
    page: Page;
    ele_allProducts: Locator;
    ele_Productslist: Locator;
    cart: Locator;
    OrdersTab: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.ele_allProducts = page.locator('.card-body');
        this.ele_Productslist = page.locator('.card-body b');
        this.cart = page.locator('[routerlink*=cart]');
        this.OrdersTab = page.getByRole('button', { name: 'ORDERS' })
    }

    async searchProductAddCart(ProductName : string)
    {
        console.log(await this.ele_Productslist.allTextContents());
        const productsCount = await this.ele_allProducts.count();
        console.log('Product Count : ', productsCount);

        for(let i = 0; i< productsCount; ++i)
        {
            if(await this.ele_allProducts.nth(i).locator('b').textContent() === ProductName)
            {
                await this.ele_allProducts.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async clickonCart()
    {
        await this.cart.click();
    }

    async nevigateToOrders()
    {
        await this.OrdersTab.click();
    }
}

//module.exports = { DashboardPage }