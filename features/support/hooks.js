const { Before } = require("@cucumber/cucumber");
const { After } = require("@cucumber/cucumber");
const { POManager } = require('../../pageObjects/POManager');
const playwright = require('@playwright/test');

Before(async function () 
{
    this.browser = await playwright.chromium.launch({headless:false, viewport: null});
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.poManager = new POManager(this.page);
});

After(async function ()
{
    console.log("Execution Complete..");
});