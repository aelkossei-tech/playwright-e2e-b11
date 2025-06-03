import { expect, test } from '@playwright/test'; 

test('Slow annotation @Regression', async({ page }) => {
    test.slow(); 
    await page.goto('https://www.techglobal-training.com/backend'); 
    await page.getByRole('link', { name: 'Instructors '}).click(); 

    expect((await page.locator('class^="Accordian_title"').all()).length).toBe(4); 
}); 

//test('Fail annotation', async({ page }) => {
    //test.fail();
    //await page.goto('https://www.techglobal-training.com/backend'); 
//}); 

test('Step annotation @Regression', async ({ page }) => {
    await test.step('Visit TechGlobal Training App', async () => {
        await page.goto('https://www.techglobal-training.com/backend');
    });

    await test.step('Click on Instructors Link', async () => {
        await page.getByRole('link', { name: 'Instructors ' }).click();
    });

    await test.step('Validate that there are 4 accordians for Instructors', async () => {
        expect((await page.locator('class^="Accordian_title"').all()).length).toBe(4);
    });
}); 

test('TS123: Test info object @SomeTag @Regression', async({ page }, testInfo) => {
    console.log(testInfo.title); // TS123: Test info object @SomeTag --> Titles* [Akin uses this]
    console.log(testInfo.tags); // ['@SomeTag', '@Regression'] --> Tags* [Akin uses this]
    console.log(testInfo.duration); 
}); 

