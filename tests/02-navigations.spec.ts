import{ test, expect } from '@playwright/test'; 

test.describe('Playwright Navigations @Regression', () => {
    test('Url and title validation', async({ page }) => {
        await page.goto('https://www.google.com/'); 
        
        expect(page.url()).toBe('https://www.google.com/');
        expect(page.url()).toContain('https://www.google.com/'); 
        
        expect(await page.title()).toBe('Google'); 

        await page.goto('https://www.apple.com/'); 
        expect(await page.title()).toBe('Apple'); 
    }); 

    test('Browser Navigation', async({ page }) => {
        await page.goto('https://www.google.com/'); 
       // await page.waitForTimeout(2000);  --> NEVER do this in work environment 

        await page.goto('https://www.apple.com/'); 

        // Refresh 
        await page.reload(); 

        // Navigate Back 
        await page.goBack(); 


        // Navigate Forward 
        await page.goForward(); 
    }); 

}); 