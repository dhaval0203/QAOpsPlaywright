import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { CartPage } from './CartPage';
import { ReviewAndPlaceOrderPage } from './ReviewAndPlaceOrderPage';
import { OrderHistoryPage } from './OrderHistoryPage';
import { Page } from '@playwright/test';

export class POManager
{
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    CartPage: CartPage;
    reviewAndPlaceOrderPage: ReviewAndPlaceOrderPage;
    orderHistoryPage: OrderHistoryPage;
    page: Page;

    constructor(page:Page)
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

//module.exports = { POManager }