const { test, expect} = require('@playwright/test');

test('Calender demo', async ({page}) => 
{
    
    let month = "6";
    let date = "15";
    let year = "2027";
    const expectedDate = [month,date,year];

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');

    await page.locator('div.react-date-picker__wrapper').click();
    await page.locator('button.react-calendar__navigation__label').click();
    await page.locator('button.react-calendar__navigation__label').click(); 
    await page.getByText(year).click();
    await page.locator('.react-calendar__year-view__months__month').nth(Number(month)-1).click();
    page.getByRole('button', { name: date }).click();

    const input = page.locator('.react-date-picker__inputGroup__input');

    for(let i = 0; i < input; i++)
    {
        const value = await input.nth(i).inputValue();
        expect(value).toEqual(expectedDate[i]);
    }

});