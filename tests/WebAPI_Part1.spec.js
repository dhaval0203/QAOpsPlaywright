import { test, expect, request } from '@playwright/test';
import { APIUtils } from '../Utils/APIUtils';
const loginPayload = {userEmail: "dhaval.ghodasara@testmail.com", userPassword: "Root@1234"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

//let token;
//let orderId;
let response;
test.beforeAll(async () => 
{
    const apiContext =await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});

test('Page Playwright test', async ({page})=>
{
    await page.addInitScript(value => 
    {
        window.localStorage.setItem('token', value);
    }, response.token);

    //const userEmail = "dhaval.ghodasara@testmail.com";

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').last().waitFor();
    

    await page.getByRole('button', { name: 'ORDERS' }).click();
    await page.locator('tbody').waitFor();
    
   
    const row = await page.locator('tr').filter({hasText:response.orderId});
    await row.getByRole('button', {name : 'View'}).click();
   
    const orderidDetail = await page.locator(".col-text.-main").textContent();
    expect(response.orderId.includes(orderidDetail)).toBeTruthy();
    
});