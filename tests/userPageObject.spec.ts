import { test, expect} from '@playwright/test';
import { PageManager } from '../page-objects/pageManager.ts';

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/');
})
test('navigate to from page', async({page}) => {

    const pm = new PageManager(page);
    await pm.navigationTo().formLayOutsPage();
    await pm.navigationTo().datepickerPage();
    await pm.navigationTo().smartTablePage();
    await pm.navigationTo().toastrPage();
    await pm.navigationTo().tooltipPage();
})

test('parametrized methods', async({page}) => {
    const pm = new PageManager(page);

    await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectionOption('test@gmail.com', 'thyai@123', 'Option 1');
    await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox('John Smith', 'John@test.com', true);
    await pm.navigationTo().datepickerPage();
    await pm.onDatepickerPage().selectCommonDatePickerDateFormToday(5);
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 25);

})