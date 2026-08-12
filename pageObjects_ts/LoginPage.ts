import { expect, Locator, Page } from "@playwright/test";

export class LoginPage
{
    page: Page;
    signInButton: Locator;
    userName: Locator;
    password: Locator;
    constructor(page: Page)
    {
        this.page = page;
        this.signInButton = page.getByRole('button',{name: 'Login'})
        this.userName =  page.locator('#userEmail')
        this.password = page.locator('#userPassword')
    }

    async openUrl()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }

    async validLogin(userName: string, password: string)
    {
        await this.userName.fill(userName);
        await this.password.fill(password)
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

//module.exports = { LoginPage };