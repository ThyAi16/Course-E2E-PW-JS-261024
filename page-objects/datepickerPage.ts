import { expect, Page } from '@playwright/test';
import { HelperBase } from './helperBase';

export class DatepickerPage extends HelperBase{
    // static selectDatepickerWithRangeFromToday(arg0: number, arg1: number) {
    //     throw new Error('Method not implemented.');
    // }
    // static selectCommonDatePickerDateFormToday(arg0: number) {
    //     throw new Error('Method not implemented.');
    // }

    //private readonly page: Page;

    constructor(page: Page) {
        super(page);
        //this.page = page;
    }

    async selectCommonDatePickerDateFormToday(numberOfDaysFormToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker');
        await calendarInputField.click();
        const dateToAssert = await this.selectDateIntheCalendar(numberOfDaysFormToday);
        await expect(calendarInputField).toHaveValue(dateToAssert);
    }

    async selectDatepickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker');
        await calendarInputField.click();
        const dateToAssertStart = await this.selectDateIntheCalendar(startDayFromToday);
        const dateToAssertEnd = await this.selectDateIntheCalendar(endDayFromToday);
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`;
        await expect(calendarInputField).toHaveValue(dateToAssert);
    }

    private async selectDateIntheCalendar(numberOfDaysFormToday: number) {
        

        let date = new Date();
        date.setDate(date.getDate() + numberOfDaysFormToday);
        const expectedDate = date.getDay().toString();
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'});
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'});
        const expectedYear = date.getFullYear();
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
        while(!calendarMonthAndYear?.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        }
        await this.page.locator('.day-cell.ng-star-inserted"]').getByText(expectedDate, {exact: true}).click();
        return dateToAssert;
        
    }

}