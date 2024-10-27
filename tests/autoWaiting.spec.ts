import { test, expect } from '@playwright/test';

test.beforeEach(async({page}, testInfor) => {
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByText('Button Triggering AJAX Request').click();
    testInfor.setTimeout(testInfor.timeout + 2000);//Thoi gian duoc cong them 2s

})
test('Autowaiting', async({page}) =>{
    const successButton = page.locator('.bg-success');
    await successButton.click();
})

test('Alternative waits', async({page}) => {
    const successButton = page.locator('.bg-success');

    //wait for element
    //await page.waitForSelector('.bg-success');

    //wait for particlular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata');

    //wait for network calls to be completed (Not commended)
    await page.waitForLoadState('networkidle');

    const text = await successButton.allTextContents();
    expect(text).toContain('Data loaded with AJAX get request.');
})

test('timeOut', async({page}) => {

    test.setTimeout(10000);
    const successButton = page.locator('.bg-success');//30s
    await successButton.click({timeout: 16000});//15s

})
