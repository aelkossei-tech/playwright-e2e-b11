import { test, expect } from '@playwright/test'; 


test.describe('Playwright Actions @Regression', () => {
    test.beforeEach(async({ page }) => {
        await page.goto('https://www.techglobal-training.com/'); 
    }); 

    test('Hover', async({ page }) => {
        await page.locator('#dropdown-testing').hover(); 
        const frontendTestingOptionVisible = await page.locator('#frontend-option').isVisible(); 
        await expect(page.locator('#frontend-option')).toBeVisible(); 
       
        console.log(frontendTestingOptionVisible); 
    }); 

    test('Scroll', async ({ page }) => {
        console.log(await page.locator('footer').isVisible()); 

    });
}); 