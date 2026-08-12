const {test, expect} = require('@playwright/test');
const { resolve } = require('node:dns');


function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

//need to run only one test then use test.only
//test.only('Page Playwright test', async ({page})=>
test('Page Playwright test', async ({page})=>
{
    const userEmail = "dhaval.ghodasara@testmail.com";
    await page.goto("https://rahulshettyacademy.com/client/");
    console.log(await page.title());  

    /*
    await page.locator(".login-wrapper-footer-text").click();
    await page.getByRole('textbox', {name: 'First Name'}).fill("Dhaval");        
    await page.getByRole('textbox', {name: 'Last Name'}).fill("Ghodasara");  
    await page.locator("#userEmail").fill("dhaval.ghodasara@testmail.com");
    await page.locator("#userMobile").fill("2564555367");
    await page.getByRole('combobox').selectOption("Engineer");
    await page.getByLabel('Male', {exact: true}).click();
    await page.locator("#userPassword").fill("Root@1234");
    await page.getByRole("textbox",{name: "Confirm Password"}).fill("Root@1234");
    await page.getByRole("checkbox").click();
    //await page.getByText('Already have an account? Login here').click();
    await page.getByRole('button',{name: 'Register'}).click();
    await page.getByRole('button',{name: 'login'}).click();
    */

    await page.locator('#userEmail').fill(userEmail);
    await page.locator('#userPassword').fill('Root@1234');
    await page.getByRole('button',{name: 'Login'}).click();

    //console.log(await page.locator('.card-body b').first().textContent());
    //console.log(await page.locator('.card-body b').nth(2).textContent());
    //await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').last().waitFor();
    const ele_itemlist = await page.locator('.card-body b').allTextContents();
    console.log(ele_itemlist);
    const ele_allProducts = page.locator('.card-body');
    const products_count = await ele_allProducts.count();
    console.log('Product Count : ', products_count);
    const product_name = 'ZARA COAT 3';
    for(let i = 0; i< products_count; ++i)
    {
        if(await ele_allProducts.nth(i).locator('b').textContent() === product_name)
        {
            await ele_allProducts.nth(i).locator("text= Add To Cart").click();
        }
    }

    await page.locator('[routerlink*=cart]').click();
    await page.locator('div li').first().waitFor();
    const inspect_cartProduct = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(inspect_cartProduct).toBeTruthy();
    await page.locator('text=Checkout').click();
    await page.locator("//div[normalize-space()='Credit Card Number']/following-sibling::input").fill("1234 5678 5678 1234");
    await page.getByRole('combobox').first().selectOption("03");
    await page.getByRole('combobox').nth(1).selectOption("02");
    await page.locator("//div[normalize-space()='CVV Code ?']/following-sibling::input").fill("584");
    await page.locator("//div[normalize-space()='Name on Card']/following-sibling::input").fill("Kriva");
    await page.locator('[name="coupon"]').fill("rahulshettyacademy");
    await page.getByRole('button', { name: 'Apply Coupon' }).click();

    const ele_couponText = await page.getByText('* Coupon Applied', { exact: true }).waitFor({
        isVisible: true,
        timeout: 5000
    });

    await page.getByPlaceholder('Select Country').pressSequentially("ind", {delay: 50});

    const ele_DD_Results = await page.locator(".ta-results");
    await ele_DD_Results.waitFor();

    const ele_DD_Count = await ele_DD_Results.locator("button").count();
    for(let i = 0; i < ele_DD_Count; i++)
    {
        let ele_DD_text = await ele_DD_Results.locator("button").nth(i).textContent();
        if(ele_DD_text.trim() === "India")
        {
            await ele_DD_Results.locator("button").nth(i).click();
            break;
        }
    }

    expect(page.locator(".user__name [type='text']").first()).toHaveText(userEmail);

    await page.locator('a:has-text("PLACE ORDER")').click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    //await page.getByRole('button', { name: 'HOME' }).click();

    await page.getByRole('button', { name: 'ORDERS' }).click();
    await page.locator('tbody').waitFor();
    const ele_OrderRows = await page.locator('tbody tr');

    for(let i = 0; i< await ele_OrderRows.count(); i++)
    {
        const rowOrderId = await ele_OrderRows.nth(i).locator('th').textContent();             
        if(orderId.includes(rowOrderId)) 
        {
            await ele_OrderRows.nth(i).locator('button').first().click();
            break;
        }      
    }

    const orderidDetail = await page.locator(".col-text.-main").textContent();
    expect(orderId.includes(orderidDetail)).toBeTruthy();
   
});