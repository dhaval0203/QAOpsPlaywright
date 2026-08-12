const {test, expect} = require('@playwright/test');
const { resolve } = require('node:dns');
const { request } = require('node:http');
const { response } = require('node:http');

test('Browser Context Playwright test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    //page.route('**/*.css',rout=> rout.abort()); //To block all css
    //page.route('**/*.{jpg,png,jpeg}',rout=> rout.abort()); //Images will not load
    page.on('request',request=> console.log(request.url()));
    page.on('response', response =>  console.log(response.url(), response.status()));    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    
    //const ele_userName = page.locator('#username'); //use CSS locator only
    //const ele_userName = page.getByRole('textbox',{name : 'username'});
    const ele_userName = page.getByLabel('Username:');
    //const ele_passWord = page.locator("[type='password']");
    const ele_passWord = page.getByLabel('Password:');
    //const ele_btn_signIn = page.getByRole('button',{type : 'submit'});//Working
    const ele_btn_signIn = page.getByRole('button',{id : 'signInBtn'}); //Working

    //await ele_userName.fill("abcd"); 
    await ele_userName.fill("rahulshettyacademy");
    await ele_passWord.fill("Learning@830$3mK2");

    //await page.locator('#signInBtn').click();
    await ele_btn_signIn.click();

    

    const ele_errormsg = page.locator("[style*='block']");
    
    if(await ele_errormsg.isVisible())
    {
        console.log(await ele_errormsg.textContent());
    }

    //await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    

    await ele_btn_signIn.click();

    //await sleep(5000);

    const ele_firstProduct = page.getByText('iPhone');

    //console.log(await page.locator(".card-body").textContent());
    console.log(await ele_firstProduct.textContent());

    const cardTitles = page.locator(".card-body");

    const allTitles = await cardTitles.allTextContents();

    console.log(allTitles);

});

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

test('UI Controls', async ({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    const ele_userName = page.getByLabel('Username:');    
    const ele_passWord = page.getByLabel('Password:');  
    const ele_dropdown = page.locator('select.form-control');
    await ele_dropdown.selectOption('Consultant');
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();

    console.log(await page.locator('.radiotextsty').last().isChecked());

    const ele_docLink = page.locator("[href*='documents-request']");

    await expect(ele_docLink).toHaveAttribute("class","blinkingText");


    //await page.pause();
   
});

test('Child Windows Handling', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const ele_userName = page.getByLabel('Username:');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const ele_docLink = page.locator("[href*='documents-request']");
    
    const [page2] = await Promise.all(
    [
        context.waitForEvent('page'),
        ele_docLink.click(),
    ])
    
    const text = await page2.locator('.red').textContent();
    const arraytext = text.split("@");
    const domain = arraytext[1].split(" ")[0];
    console.log(domain);
    await ele_userName.fill(domain);
    
    console.log(await ele_userName.textContent());    
});

