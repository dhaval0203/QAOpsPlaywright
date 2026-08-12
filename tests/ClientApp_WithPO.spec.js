const {test, expect} = require('@playwright/test');
const { resolve } = require('node:dns');
const { POManager } = require('../pageObjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require('../Utils/placeholderTestData.json')));

for(const data of dataSet)
{
    test(`@Web Client App Order for ${data.product_name}`, async ({page})=>
    {   
        const poManager = new POManager(page);
        
        //Login PO
        const loginPage = poManager.getLoginPage();
        await loginPage.openUrl();
        await loginPage.validLogin(data.userEmail,data.password);
        //Dashboard PO
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.product_name);
        await dashboardPage.clickonCart();
        //Cart PO
        const cartPO = poManager.getCartPage();
        await cartPO.VerifyProductIsDisplayed(data.product_name);
        await cartPO.Checkout();
        //Review and Place Order PO
        const reviewandPlaceOrderPO = poManager.getReviewAndPlaceOrderPage();
        await reviewandPlaceOrderPO.enterPaymentDetails(data.crediCardNumber,data.ExpiryMonth,data.ExpiryDate,data.cvv,data.CardName);
        await reviewandPlaceOrderPO.applyCoupon();
        await reviewandPlaceOrderPO.searchCountryAndSelect("ind","India");
        await reviewandPlaceOrderPO.VerifyEmailId(data.userEmail);    
        const orderId = await reviewandPlaceOrderPO.SubmitAndGetOrderId();
        console.log(orderId);

        //Navigate to Orders Tab
        await dashboardPage.nevigateToOrders();

        //Order History PO
        const orderHistoryPage = poManager.getOrderHistoryPage();
        await orderHistoryPage.searchOrderAndSelect(orderId);    
        expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();    
    });
}