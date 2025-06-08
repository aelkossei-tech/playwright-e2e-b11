import { test, expect } from '@playwright/test'; 
import { text } from 'stream/consumers';

/*
1. Go to https://www.techglobal-training.com/frontend/actions 
2. Click on "Click on me" button 
3. Validate "You clicked on a button!" text is visible 

*/
test.describe('Playwright Actions @Regression', () => {
    test.beforeEach(async({ page }) => {
        await page.goto('https://www.techglobal-training.com/frontend/actions'); 
    }); 

    test('Validate Click On Me Button', async ({ page }) => {
        // page.getByRole('button', {name: 'Click on me', exact: true}).click(); 
        // await page.locator('#click').click();  
        //await page.getByText('Click on me', { exact: true }).click(); 
        await page.click('#click');
        
        expect(await page.locator('#click_result').innerText()).toBe('You clicked on a button!'); 
        // await expect(page.getByText('You clicked on a button!')).toBeVisible(); 

        /*
        Right click or double click on elements: 

        await page.locator('#right-click').click({ button: 'right'}); 
        await page.locator('#double-click').click({ clickCount: 2 }); 
        ALSO await page.locator('#double-click').dblclick();  

        */
    }); 

    test('Fill-Clear input box', async({ page }) => {
        const inputElement = page.locator('#input_box'); 

        await inputElement.fill('Playwright'); 
        expect(await inputElement.getAttribute('value')).toBe('Playwright');

        // Clear with fill(''); 
        await inputElement.fill(''); 


        await inputElement.fill('TypeScript'); 
        expect(await inputElement.getAttribute('value')).toBe('TypeScript');

        // Clear with clear(''); 
        await inputElement.clear(); 
    }); 

}); 