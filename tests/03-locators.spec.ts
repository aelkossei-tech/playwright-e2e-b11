import { test, expect } from '@playwright/test'; 

test.describe('@Smoke', () => {
    test.beforeEach(async({ page }) => {
        test.setTimeout(10000); 
        await page.goto('https://www.techglobal-training.com/frontend/html-elements'); 
    }); 

    test.skip('Explicit timeouts for any action', async({ page }) => {
       await expect(page.locator('#dkfhjdk')).toBeVisible({ timeout: 10000}); 
        await page.click('#skjfkldj', { timeout: 10000 })
    }); 

    test('CSS/XPath Selectors', async({ page }) => {
        // locator
        page.locator(''); // you can pass CSS or XPath 
    }); 
})