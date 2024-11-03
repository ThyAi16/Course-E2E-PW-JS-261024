import { test, expect } from '@playwright/test';
import exp from 'constants';
import { it } from 'node:test';

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/');
})

test.describe('Form Layouts page', () => {
    test.beforeAll(async({page}) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    })
    //Input fields
    test('input fields', async({page}) => {
        const usingTheFridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

        await usingTheFridEmailInput.fill('test1@test.com');
        await usingTheFridEmailInput.clear();
        await usingTheFridEmailInput.pressSequentially('test2@test.com', {delay: 500});

        //Generic assertion
        const inputValue = await usingTheFridEmailInput.inputValue();
        expect(inputValue).toEqual('test2@taest.com');

        //Locator assertion
        await expect(usingTheFridEmailInput).toHaveValue('test@test.com');
    })

    //Radio buttons
    test('Radio buttons', async({page}) => {
        const usingTheFridForm = page.locator('nb-card', {hasText: "Using the Grid"});
        //Methods 1
        //await usingTheFridForm.getByLabel('Option 1').check({force: true});
        //Methods 2
        await usingTheFridForm.getByRole('radio', {name: "Option 1"}).check({force: true});
        //Check radio: Option 1
        const radioStatus = await usingTheFridForm.getByRole('radio', {name: "Option 1"}).isChecked();
        expect(radioStatus).toBeTruthy();  
        await expect(usingTheFridForm.getByRole('radio', {name: "Option 1"})).toBeChecked();

        //Check radio: Option 2
        await usingTheFridForm.getByRole('radio', {name: "Option 2"}).check({force: true});
        expect(await usingTheFridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy();
        expect(await usingTheFridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy();
    })
    //Checkboxes
    test('checkboxes', async({page}) => {
        await page.getByText('Modal & Overlays').click();
        await page.getByText('Toastr').click();

        await page.getByRole('checkbox', {name: "Hide on click"}).check({force: true});//uncheck
        await page.getByRole('checkbox', {name: "Prevent arsing of duplicate toast "}).uncheck({force: true});

        //Loop for: all checkbox is true
        const allBoxes = page.getByRole('checkbox');
        for(const box of await allBoxes.all()) {
            await box.check({force: true});
            expect(await box.isChecked()).toBeTruthy();
            //Uncheck
            await box.uncheck({force: true});
            expect(await box.isChecked()).toBeFalsy();
        }
    })
    //List and Dropdowns
    test('lists and drpdowns', async({page}) => {
        const dropDownMenu = page.locator('ngx-header nb-select');
        await dropDownMenu.click();

        page.getByRole('list')//When the list has a UL tag
        page.getByRole('listitem');//When the list has LI tag

        //const optionList = page.getByRole('list).locator('nb-option);
        const optionList = page.locator('nb-option-list nb-option');
        await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);
        await optionList.filter({hasText: "Cosmic"}).click();
        const header = page.locator('nb-layout-header');
        await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

        const colors = {
            "Light": "rgb(255, 255, 255)",
            "Dark": "rgb(34, 43, 69)",
            "Cosmic": "rgb(50, 50, 89)",
            "Corporate": "rgb(255, 255, 255)"
        }
        await dropDownMenu.click();
        for(const color in colors) {
            await optionList.filter({hasText: color}).click();
            await expect(header).toHaveCSS('background-color', colors[color]);
            if(color != "Corporate")
                await dropDownMenu.click();
        }
    })
    //Tooltips
    test('toolTips', async({page}) => {
        await page.getByText('Modal & Overlays').click();
        await page.getByText('Tooltip').click();

        const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"});
        await toolTipCard.getByRole('button', {name: "Top"}).hover();

        page.getByRole('tooltip');//If you have a role tooltip created
        const tooltip = await page.locator('nb-tooltip').textContent();
        expect(tooltip).toEqual('This is a tooltip');

    })
    //Dialog box
    test('dialog box', async({page}) => {
        await page.getByText('Tables & Data').click();
        await page.getByText('Smart Table').click();

        page.on('dialog', dialog => {
            expect(dialog.message()).toEqual('Are you sure you want to delete');
            dialog.accept();
        })
        await page.getByRole('table').locator('tr', {hasText: "hocngu@gmail.com"}).locator('nb-trash').click();
        await expect(page.locator('table tr'). first()).not.toHaveText('hocngu@gmail.com');
    })
    //Web tables
    test('web tables', async({page}) => {
        await page.getByText('Tables & Data').click();
        await page.getByText('Smart Table').click();

        //1 get the row by any test in this row
        const targetRow = page.getByRole('row', {name: "twitter@outlook.com"});//The field has a unique email text
        await targetRow.locator('.nb-edit').click();
        await page.locator('input-editor').getByPlaceholder('Age').clear();
        await page.locator('input-editor').getByPlaceholder('Age').fill('35');
        await page.locator('.nb-checkmark').click();

        //2 get the row based on the value in the specific column
        await page.locator('.ng2-smart-pagination-nav').getByText('2').click();//Pagination
        const targetRowById = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')});
        await targetRow.locator('.nb-edit').click();
        await page.locator('input-editor').getByPlaceholder('E-mail').clear();
        await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@gmail.com');
        await page.locator('.nb-checkmark').click();
        await expect(targetRowById.locator('td').nth(5)).toHaveText('test@gmail.com');//(targetRowById.locator('td').nth(5)) -> column

        //3 test filter of the tables
        const ages = ["20", "30", "40", "200"];
        for( let age of ages) {
            await page.locator('input-filter').getByPlaceholder('Age').clear();
            await page.locator("input-filter").getByPlaceholder('Age').fill(age);
            await page.waitForTimeout(500);
            const ageRows = page.locator('tbody tr');//all row age in table
            for(let row of await ageRows.all()) {
                const cellValue = await row.locator('td').last().textContent();//locator('td') -> column

                if(age == "200") {
                    expect(await page.getByRole('table').textContent()).toContain('No data found');
                } else {
                    expect(cellValue).toEqual(age);
                }
            }
        }
    })
    //Data pickers: methods 1
    test('dataPicker1', async({page}) => {
        await page.getByText('Forms').click();
        await page.getByText('Datapicker').click();

        const calendarInputField = page.getByPlaceholder('Form Picker');
        await calendarInputField.click();

        await page.locator('[class="day-cell ng-star-inserted]').getByText('1', {exact: true}).click();
        await expect(calendarInputField).toHaveValue('Jun 1, 2023');

    })
    //Data pickers: methods 2
    test('dataPicker2', async({page}) => {
        await page.getByText('Forms').click();
        await page.getByText('Datapicker').click();

        const calendarInputField = page.getByPlaceholder('Form Picker');
        await calendarInputField.click();

        await page.locator('[class="day-cell ng-star-inserted]').getByText('1', {exact: true}).click();
        await expect(calendarInputField).toHaveValue('Jun 1, 2023');

    })

})