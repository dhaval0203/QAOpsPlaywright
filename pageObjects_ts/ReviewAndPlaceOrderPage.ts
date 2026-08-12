import { expect, Locator, Page } from "@playwright/test";

export class ReviewAndPlaceOrderPage
{
    page: Page;
    creditCardNumber: Locator;
    expiryCombo: Locator;
    cvvtxt: Locator;
    cardHolderName: Locator;
    coupontxt: Locator; 
    ApplyBtn: Locator;
    country: Locator;
    dropdown: Locator;
    emailId: Locator;
    placeOrderBtn: Locator;
    orderConfirmationText: Locator;
    orderId: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.creditCardNumber = page.locator("//div[normalize-space()='Credit Card Number']/following-sibling::input");
        this.expiryCombo = page.getByRole('combobox');
        this.cvvtxt =  page.locator("//div[normalize-space()='CVV Code ?']/following-sibling::input");
        this.cardHolderName = page.locator("//div[normalize-space()='Name on Card']/following-sibling::input");        
        this.coupontxt = page.locator('[name="coupon"]');
        this.ApplyBtn = page.getByRole('button', { name: 'Apply Coupon' });

        //this.country = page.locator("[placeholder*='Country']");
        this.country = page.getByPlaceholder('Select Country');
        this.dropdown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']").first();
        this.placeOrderBtn =  page.locator("a:has-text('PLACE ORDER')");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }
    
    async enterPaymentDetails(CardNumber: string, expiryMonth: string, expiryDate: string, cvv: string, nameOnCard: string)
    {
        await this.creditCardNumber.fill(CardNumber);
        await this.expiryCombo.first().selectOption(expiryMonth);
        await this.expiryCombo.nth(1).selectOption(expiryDate);
        await this.cvvtxt.fill(cvv);
        await this.cardHolderName.fill(nameOnCard);
    }

    async applyCoupon()
    {   
        await this.coupontxt.fill('rahulshettyacademy');
        await this.ApplyBtn.click();
        await this.page.getByText('* Coupon Applied', { exact: true }).waitFor({ state: 'visible', timeout: 5000 });
    }

    async searchCountryAndSelect(countryCode: string, countryName: string)
    {
        /*
        await this.country.type(countryCode,{delay:100});
        await this.dropdown.waitFor({ state : 'visible',timeout : 5000});
        const optionsCount = await this.dropdown.locator("button").count();
        for(let i =0;i< optionsCount; ++i)
        {
            const  text =  await this.dropdown.locator("button").nth(i).textContent();
            if(text.trim() === countryName)
            {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        } 
        */        
        await this.country.pressSequentially(countryCode, {delay: 100});
        await this.page.getByRole('button',{name : countryName}).nth(1).click();
    }
    async VerifyEmailId(username: string)
    {
        await expect(this.emailId).toHaveText(username);
    }
    
    async SubmitAndGetOrderId()
    {
        await this.placeOrderBtn.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();
    }
}

//module.exports = { ReviewAndPlaceOrderPage }
