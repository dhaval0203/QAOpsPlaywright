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

// npx cucumber-js features/Ecommerce.feature --parallel 2 --exit --format html:cucumber-report.html
//npx cucumber-js features/Ecommerce.feature --parallel 2 --exit
//npx cucumber-js --tags "@Validation" --exit
//npx cucumber-js --tags "@Regression" --exit
//npx cucumber-js features/ErrorValidations.feature --exit
//npx cucumber-js --tags "@Regression" --retry 1 --exit --format html:cucumber-report.html

//To run tests on Azure
// az login
//$env:PLAYWRIGHT_SERVICE_URL="wss://eastus.api.playwright.microsoft.com/playwrightworkspaces/68ac79ad-92d1-4d2a-80eb-964e5ecb1736/browsers"
//npx playwright test --config=playwright.service.config.js --workers=4
//npx playwright test /tests/Download-UploadExcelFile_Test.spec.js --config=playwright.service.config.js //For single test execution

//user id 
//Go to - >  Microsoft Entra ID -> Left Panel -> Manage -> Users -> Select User -> Object ID
// 229c57d0-3eb0-4239-ad20-90c7bed267dd

//to get storage account
/*
az storage account show\
--name "pwstrgrrd5c42"\
--resource-group "rrd"\
--query id -o tsv
*/

//role assignment create
/*
az role assignment create --assignee "229c57d0-3eb0-4239-ad20-90c7bed267dd" --role "Storage Blob Data Contributor" --scope "$(az storage account show --name pwstrgrrd5c42 --resource-group "rrd" --query id -o tsv)"
*/

/*
git commands :
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/dhaval0203/QAOpsPlaywright.git
git push -u origin main
*/