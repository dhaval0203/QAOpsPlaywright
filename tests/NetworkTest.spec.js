import { test, expect, request } from '@playwright/test';
import { APIUtils } from '../Utils/APIUtils';
const loginPayload = {userEmail: "dhaval.ghodasara@testmail.com", userPassword: "Root@1234"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const fakePayload = {data:[], message: "No Orders"};
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

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*', async route => 
    {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayload);
        route.fulfill(
        {
            response,
            body,
        });
    }
    );

    await page.getByRole('button', { name: 'ORDERS' }).click();

    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
    
    console.log(await page.locator('.mt-4').textContent());    
    
});