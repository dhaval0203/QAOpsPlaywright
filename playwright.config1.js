// @ts-check
//const { defineConfig, devices, firefox } = require('@playwright/test');
const { defineConfig, devices } = require('@playwright/test');
import path from 'path';
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(__dirname, '.playwright-browsers');


const config = defineConfig(
{
  //retries : 1,
  //workers : 1,
  testDir: './tests',
  timeout: 30 * 1000,
  expect : //expect timeout for assertion level
  {
    timeout : 5 * 1000
  },
  reporter : 'html',
  projects :
  [
    {
      name : 'chrome',
      use : 
      {
        browserName : 'chromium',
        headless : false, //if true then run in headless mode
        viewport : null,        
        
        launchOptions : {
          args : ['--start-maximized']
        }    
      }
    },
    {
      name : 'safari',
      use : 
      {
        browserName : 'webkit',
        headless : false, //if true then run in headless mode
        //viewport : {width : 1920,height : 1080},        
        ...devices['iPhone 17 Pro Max'],
        launchOptions : 
        {
          args : ['--start-maximized']
        }    
      }
    }
  ]  
});

module.exports = config;