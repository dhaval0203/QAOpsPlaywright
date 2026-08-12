import { test, expect, request } from '@playwright/test';

test('Security Test Request Intercept', async ({page}) =>
{
    const userEmail = "dhaval.ghodasara@testmail.com";
    await page.goto("https://rahulshettyacademy.com/client/");
    
    await page.getByPlaceholder('email@example.com').fill(userEmail);    
    await page.getByPlaceholder('enter your passsword').fill('Root@1234');
    await page.getByRole('button',{name: 'Login'}).click();

    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').last().waitFor();

    await page.getByRole('button', { name: 'ORDERS' }).click();
    await page.locator('tbody').waitFor();

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*', 
        route => route.continue({url : 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a66a24285b8849b49105000'}))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator('p').last()).toHaveText('You are not authorize to view this order');
    
});