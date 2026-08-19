const {test, expect} = require('@playwright/test');
const { resolve } = require('node:dns');

let webContext;
test.beforeAll(async ({browser}) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userEmail = "dhaval.ghodasara@testmail.com";
    await page.goto("https://rahulshettyacademy.com/client/");
    console.log(await page.title());  
    await page.getByPlaceholder('email@example.com').fill(userEmail);    
    await page.getByPlaceholder('enter your passsword').fill('Root@1234');
    await page.getByRole('button',{name: 'Login'}).click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});
});

test('Page Playwright test', async ()=>
{
    //await page.locator('#userEmail').fill(userEmail);
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').last().waitFor();
    
    await page.locator('.card-body').filter({hasText:'ZARA COAT 3'}).getByRole('button',{name:'Add To Cart'}).click();

    await page.getByRole('listitem').getByRole('button',{name: 'Cart'}).click();

    //await page.locator('[routerlink*=cart]').click();
    await page.locator('div li').first().waitFor();

    await expect(page.getByText('ZARA COAT 3')).toBeVisible();

    //await page.locator('text=Checkout').click();
    await page.getByRole('button', {name: 'Checkout'}).click();

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
    await page.getByRole('button',{name : 'India'}).nth(1).click();
    await page.getByText('PLACE ORDER').click();

    await expect(page.getByText(' Thankyou for the order. ')).toBeVisible();
    const orderId = (await page.locator(".em-spacer-1 .ng-star-inserted").innerText()).replace(/\|/g, '').trim();
    console.log(orderId);

    await page.getByRole('button', { name: 'ORDERS' }).click();
    await page.locator('tbody').waitFor();
    
   
    const row = await page.locator('tr').filter({hasText:orderId});
    await row.getByRole('button', {name : 'View'}).click();
   
    const orderidDetail = await page.locator(".col-text.-main").textContent();
    expect(orderId.includes(orderidDetail)).toBeTruthy();
    
});