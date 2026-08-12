const {test, expect} = require('@playwright/test');
const { resolve } = require('node:dns');

test('Event Handling Demo', async ({page}) => 
{
    const username = 'dhaval.ghodasara@gmail.com';
    const password = 'Root@1234';
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    const evetitle_Date = Date.now();
    const eve_title = 'TestEvent_' + evetitle_Date;
    console.log('eve_titleDate : ', evetitle_Date);
    console.log('eve_title : ', eve_title);
    await login(page, username, password);    //Login to EventHub
    await createNewEvent(page, eve_title, evetitle_Date); //Create New Event
    const seatsB4Booking = await eventVerificationandSeatsAvailable(page, eve_title,`BookSeat`); //verify Event is created and Seats available and also ckick on Book Now button    
    console.log('Seats Available b4 Booking : ', seatsB4Booking);  
    const BookingReferenceNumber = await eventBooking(page, eve_title); //Book Event and get reference number
    console.log('Booking Reference Number : ', BookingReferenceNumber);
    await VerifyBooking(page, BookingReferenceNumber, eve_title); //Verify Booking Reference Number in My Bookings
    const seatsAfterBooking = await eventVerificationandSeatsAvailable(page, eve_title,``); //Verify Seats Available after Booking, used above same function
    console.log('Seats Available after Booking : ', seatsAfterBooking);
    expect(parseInt(seatsB4Booking) - parseInt(seatsAfterBooking)).toBe(1); //Verify Seats Available after Booking is reduced by 1
});


async function VerifyBooking(page, BookingReferenceNumber, eve_title)
{
    await page.getByRole('button', { name: 'View My Bookings' }).click();    
    await page.waitForURL('https://eventhub.rahulshettyacademy.com/bookings');
    expect(page.url()).toBe('https://eventhub.rahulshettyacademy.com/bookings');
    const bookingcard_ele = page.getByTestId('booking-card');
    expect(bookingcard_ele.last()).toBeVisible();
    expect(bookingcard_ele.getByText(`${BookingReferenceNumber}`, { exact: true } )).toBeVisible();
    expect(bookingcard_ele.getByText(`${eve_title}`, { exact: true } )).toBeVisible();
    //await page.pause();
}

async function eventBooking(page, eve_title)
{
    expect(page.getByRole('heading', { name: `${eve_title}` })).toBeVisible();
    expect(page.getByText('1', { exact: true })).toBeVisible();
    await page.getByRole('textbox', { name: 'Full Name*' }).fill('Dhaval Ghodasara');
    await page.getByRole('textbox', { name: 'Email*' }).fill('dhaval.ghodasara@gmail.com');
    await page.getByRole('textbox', { name: 'Phone Number*' }).fill('7506444186');    
    await page.getByRole('button', { name: 'Confirm Booking' }).click();
    await expect(page.getByRole('heading', { name: 'Booking Confirmed! 🎉' })).toBeVisible();

    let referenceNumber = await page.locator('.booking-ref').first().textContent();
    return referenceNumber;
    //await page.pause();
}

async function eventVerificationandSeatsAvailable(page, eve_title, seatsToBook)
{
    await page.getByText('Events', { exact: true }).click();
    await page.getByTestId('event-card').last().waitFor();
    await page.waitForTimeout(2000); //Wait for 2 seconds to load all events, as sometimes it takes time to load all events.
    const eventcard_ele = page.getByTestId('event-card');
    const eventCard_Count = await eventcard_ele.count();    
    let seatsAvailable = 0;
    for(let i = 0; i < eventCard_Count; ++i)
    {
        const eventTitlefromPage = await eventcard_ele.nth(i).locator('h3').textContent();        
        if(eventTitlefromPage === eve_title)
        {
            seatsAvailable = await eventcard_ele.nth(i).locator('div span').nth(3).textContent(); 
            if(seatsToBook === `BookSeat`)
            {
                await eventcard_ele.nth(i).getByRole('link', { name: 'Book Now' }).click();
            }            
            break;
        }
    }

    return seatsAvailable;
}

async function createNewEvent(page, eve_title, evetitle_Date)
{
    //Go to Admin -> Manage Events
    await page.getByRole('button', { name: 'Admin' }).click();
    await page.locator('a').filter({ hasText: 'Manage Events' }).first().click();
    await page.getByPlaceholder('Event title').fill(eve_title);
    await page.getByRole('textbox', { name: 'Describe the event…' }).fill('New Event Created by Dhaval on date : ' + new Date().toLocaleDateString('en-GB'));
    await page.getByRole('combobox').selectOption('Concert');
    await page.getByLabel('City*').fill('Mumbai');
    await page.getByLabel('Venue*').fill('Churchgate');
    
    const dateTimeLocator = page.getByRole('textbox', { name: 'Event Date & Time*' });
    //await page.getByRole('textbox', { name: 'Event Date & Time*' }).click();
    await dateTimeLocator.click();
    
    const date = new Date(evetitle_Date);
    date.setDate(date.getDate() + 10); // Add 10 days to the current date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    //use below tab key as unable to get locator of date time picker.
    await dateTimeLocator.type(`${year}`);
    await dateTimeLocator.press('Tab');
    await dateTimeLocator.type(`${month}`);    
    await dateTimeLocator.type(`${day}`);    
    await dateTimeLocator.type(`${hour}`);    
    await dateTimeLocator.type(`${minute}`);
    
    const price = month + day + hour + minute;
    await page.locator('label').filter({ hasText: 'Price ($)*' }).fill(`${price}`);

    await page.getByLabel('Total Seats*').fill('75');

    await page.getByRole('button', { name: '+ Add Event' }).click();

    await expect(page.getByText('Event created!', { exact: true })).toBeVisible();   
}


async function login(page, username, password)
{
    await page.getByPlaceholder('you@email.com').fill(username);
    await page.getByLabel('Password').fill(password);   
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}