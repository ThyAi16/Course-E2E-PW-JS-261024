import { Page, expect } from 'playwright/test';
import { NavigationPage } from './../page-objects/navigationPage.ts';
import { FormLayoutsPage } from '../page-objects/formsLayoutsPage.ts';
import { DatepickerPage } from '../page-objects/datepickerPage.ts';

export class PageManager {

    private readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly formLayoutsPage: FormLayoutsPage;
    private readonly datepickerPage: DatepickerPage;

    constructor(page: Page) {
        this.page = page;
        this.navigationPage = new NavigationPage(this.page);
        this.formLayoutsPage = new FormLayoutsPage(this.page);
        this.datepickerPage = new DatepickerPage(this.page);
    }
    navigationTo() {
        return this.navigationPage;
    }

    onFormLayoutPage() {
        return this.formLayoutsPage;
    }

    onDatepickerPage() {
        return this.datepickerPage;
    }
}
