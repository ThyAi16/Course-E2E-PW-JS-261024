import { test, expect} from '@playwright/test';
import { PageManager } from '../page-objects/pageManager.ts';
import { faker } from "@faker-js/faker";

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
    const randomFullName = faker.person.fullName();//random fullname
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectionOption('test@gmail.com', 'thyai@123', 'Option 1');
    await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true);
    // await pm.navigationTo().datepickerPage();
    // await pm.onDatepickerPage().selectCommonDatePickerDateFormToday(5);
    // await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 25);

})