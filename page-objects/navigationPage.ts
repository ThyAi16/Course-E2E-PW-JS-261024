import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {
    // static tooltipPage() {
    //     throw new Error('Method not implemented.');
    // }
    // static toastrPage() {
    //     throw new Error('Method not implemented.');
    // }
    // static smartTablePage() {
    //     throw new Error('Method not implemented.');
    // }
    // static datepickerPage() {
    //     throw new Error('Method not implemented.');
    // }
    // static formLayOutsPage() {
    //     throw new Error('Method not implemented.');
    // }
    readonly fromLayoutsMenuItem: Locator;
    readonly datePickerMenuItem: Locator;
    readonly smartTableMenuItem: Locator;
    readonly toastrMenuItem: Locator;
    readonly tooltipMenuItem: Locator;

    constructor(page: Page) {
        super(page);
        this.fromLayoutsMenuItem = page.getByText('Form Layouts');
        this.datePickerMenuItem = page.getByText('Datapicker');
        this.smartTableMenuItem = page.getByText('Smart Table');
        this.toastrMenuItem = page.getByText('Toastr');
        this.tooltipMenuItem =  page.getByText('Tooltip');
    }

    async formLayOutsPage() {
        //await this.page.getByText('Forms').click();
        await this.selectGroupMenuItem('Forms');
        await this.fromLayoutsMenuItem.click();
        await this.waitForNumberOfSeconds(2);
    }

    async datepickerPage() {
       // await this.page.getByText('Form').click();
        await this.selectGroupMenuItem('Forms');
        //await this.page.waitForTimeout(1000);
        await this.datePickerMenuItem.click();
    }

    async smartTablePage() {
        //await this.page.getByText('Table & Data').click();
        await this.selectGroupMenuItem('Table & Data');
        await this.smartTableMenuItem.click();
    }

    async toastrPage() {
        //await this.page.getByText('Modal & Overlays').click();
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.toastrMenuItem.click();
    }

    async tooltipPage() {
        //await this.page.getByText('Modal & Overslay').click();
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.tooltipMenuItem.click();
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const GroupMenuItem = this.page.getByTitle(groupItemTitle);
        const expandedState = await GroupMenuItem.getAttribute('aria-expanded');
        if(expandedState == "false")
            await GroupMenuItem.click();
    }
}