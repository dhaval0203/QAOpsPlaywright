import { expect, type Locator, type Page } from '@playwright/test';

let message1 : string = "Hello, World! From TS..";
console.log(message1);
message1 = "2";
console.log(message1);

let age1 : number = 25;
console.log(age1);

let isActive : boolean = false;
console.log(isActive);

let numbersTS : number[] = [1, 2, 3, 4, 5];
console.log(numbersTS);

let data : any = "Not sure what type this is";
console.log(data);
data = 2;
console.log(data);

function addTs(a: number, b: number): number 
{
    return a + b;
}
console.log(addTs(5, 3));

let user : { name: string, age: number } = { name: "John", age: 30 };
console.log(user);


class CartPage
{
    page : Page;
    cartProducts : Locator;
    checkout : Locator;
    constructor(page: Page)
    {
        this.page = page;
        this.cartProducts = page.locator("div li").first();        
        this.checkout = page.locator("text=Checkout");
    }

}