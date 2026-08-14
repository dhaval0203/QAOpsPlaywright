const { test, expect } = require('@playwright/test');

//test.describe.configure({ mode: 'parallel' });
test('@Web More Validations Demo', async ({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    //await page.goto('https://google.com/');
    //await page.goBack();
    //await page.goForward();    
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    //page.on('dialog', dialog => dialog.accept());
    
    page.once('dialog', async dialog => await dialog.accept());
    await page.locator('#confirmbtn').click();       
    page.once('dialog', async dialog => await dialog.dismiss());
    await page.locator('#confirmbtn').click();    
    page.locator("#mousehover").hover();
    const framePage = page.frameLocator('#courses-iframe');
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framePage.locator('.text h2').textContent();
    console.log(textCheck.split(' ')[1]);
    //await page.pause();
});

test("Screenshot", async({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');    
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:'locatorscreenshot.png'});
    await page.locator('#hide-textbox').click();
    await page.screenshot({path:'screenshot.png'});
    await expect(page.locator('#displayed-text')).toBeHidden();
});

test('Visual', async ({page}) =>
{
    await page.goto('https://flightware.com/');
   // expect(await page.screenshot()).toMatchSnapshot('landing.png');
});