// @ts-check
//const { defineConfig, devices, firefox } = require('@playwright/test');
const { defineConfig, devices } = require('@playwright/test');
//import path from 'path';
//process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(__dirname, '.playwright-browsers');


const config = defineConfig(
{
  testDir: './tests',
  timeout: 30 * 1000,
  expect : //expect timeout for assertion level
  {
    timeout : 5 * 1000
  },
  reporter : 'html',
  use: 
  {
    browserName : 'chromium', //Chrome Browser
    //browserName : 'firefox', //FireFox Browser
    //browserName : 'webkit', //safari extention created for playwright
    headless : false, //if true then run in headless mode        
    viewport : null,
    //trace : 'on-first-retry',
   //screenshot : 'only-on-failure',
    launchOptions : {
      args : ['--start-maximized ']
    }
  },  
});

module.exports = config;