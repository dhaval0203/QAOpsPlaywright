const { When, Then, Given } = require('@cucumber/cucumber');
//const { POManager } = require('../../pageObjects/POManager');
const { expect } = require('@playwright/test');
//const playwright = require('@playwright/test');


Given('a login to Ecommerce application with {string} and {string}', {timeout: 10 * 1000}, async function (username, password) {
        
    //Login PO
    const loginPage = this.poManager.getLoginPage();
    await loginPage.openUrl();
    await loginPage.validLogin(username,password);
});

When('Add {string} to the cart', async function (product_name) {
  
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(product_name);
    await this.dashboardPage.clickonCart();
  
});

Then('Verify {string} is displayed in the cart', async function (product_name) {
  
    const cartPO = this.poManager.getCartPage();
    await cartPO.VerifyProductIsDisplayed(product_name);
    await cartPO.Checkout();
});

When('Enter Valid details like {string},{string},{string},{string},{string},{string} and place the order', 
    async function (crediCardNumber,ExpiryMonth,ExpiryDate,cvv,CardName,userEmail) {
  
    const reviewandPlaceOrderPO = this.poManager.getReviewAndPlaceOrderPage();
    await reviewandPlaceOrderPO.enterPaymentDetails(crediCardNumber,ExpiryMonth,ExpiryDate,cvv,CardName);
    await reviewandPlaceOrderPO.applyCoupon();
    await reviewandPlaceOrderPO.searchCountryAndSelect("ind","India");
    await reviewandPlaceOrderPO.VerifyEmailId(userEmail);    
    this.orderId = await reviewandPlaceOrderPO.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('Verify order present in the Order History', async function () {
  
    await this.poManager.getDashboardPage().nevigateToOrders();
    //Order History PO
    const orderHistoryPage = this.poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(this.orderId);    
    expect(this.orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();    
});

Given('a login to Ecommerce2 application with {string} and {string}', {timeout: 10 * 1000}, async function (username, password) {
    
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const ele_userName = this.page.getByLabel('Username:');
    const ele_passWord = this.page.getByLabel('Password:');
    const ele_btn_signIn = this.page.locator('#signInBtn'); 
    await ele_userName.fill(username);    //rahulshettyacademy
    await ele_passWord.fill(password);    //Learning@830$3mK2
    await ele_btn_signIn.click();
    
});

Then('Verify Error message is displayed', async function () {
  
    const ele_errormsg = this.page.locator("[style*='block']");
    
    if(await ele_errormsg.isVisible())
    {
        console.log(await ele_errormsg.textContent());
    }

    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});
