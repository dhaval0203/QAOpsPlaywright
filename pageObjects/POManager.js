const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { CartPage } = require('./CartPage');
const { ReviewAndPlaceOrderPage } = require('./ReviewAndPlaceOrderPage');
const { OrderHistoryPage } = require('./OrderHistoryPage');

class POManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.CartPage = new CartPage(this.page);
        this.reviewAndPlaceOrderPage = new ReviewAndPlaceOrderPage(this.page);
        this.orderHistoryPage = new OrderHistoryPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartPage()
    {
        return this.CartPage;
    }

    getReviewAndPlaceOrderPage()
    {
        return this.reviewAndPlaceOrderPage;
    }

    getOrderHistoryPage()
    {
        return this.orderHistoryPage;
    }
}

module.exports = { POManager }