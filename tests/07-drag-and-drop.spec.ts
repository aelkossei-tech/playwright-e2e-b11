import { test, expect } from '@playwright/test'; 
import { text } from 'stream/consumers';

test.describe('Playwright Actions @Regression', () => {
    test.beforeEach(async({ page }) => {
        await page.goto('https://www.techglobal-training.com/frontend/actions'); 
    }); 

    test('Drag & Drop', async({ page }) => {
        await page.dragAndDrop('#drag_element','#drop_element'); 
        
        //await page.locator('#drag_element').dragTo(page.locator('#drop_element')); 
        expect(await page.locator('#drag_and_drop_result').innerText()).toBe('An element dropped here!'); 

    }); 
});