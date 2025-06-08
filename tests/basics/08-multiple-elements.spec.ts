import { test, expect } from '@playwright/test'; 
import { text } from 'stream/consumers';

test.describe('Playwright Multiple Elements @Regression', () => {
    test.beforeEach(async({ page }) => {
        await page.goto('https://www.techglobal-training.com'); 
    }); 

    /*
        1.) Go to "https://www.techglobal-training.com"
        2.) Validate the header has 3 menu items 
    */

    test('Validate Headers', async ({ page }) => {
        const headerElements = page.locator('[class^="Header_menus"]>div');
        expect(await headerElements.count()).toBe(3);

        const expectedHeaderItemTexts = ['Testing', 'Exercises', 'Mock Interviews'];

        for (let i = 0; i < await headerElements.count(); i++) {
            expect(await headerElements.nth(i).innerText()).toBe(expectedHeaderItemTexts[i]);
        }
        /*
        console.log(headerElements.first().innerText()); 
        console.log(headerElements.nth(1).innerText()); 
        console.log(headerElements.last().innerText()); 
        */

    });

    test('Validate Footer Social Icons', async ({ page }) => {
        /*
            1.) Go to "https://www.techglobal-training.com"
            2.) Validate the footer has 5 social media items
            3.) Each has an href containing "techglobal"
            4.) Each has target attribute equals "_blank"
                - .HasAttribute()
        */

        const socialMediaElements = page.locator('[class^="Footer_socials"]>a'); 
        const count = await socialMediaElements.count(); 
        expect(count).toBe(5); 
     
        for(let i = 0; i < count; i++){
            expect(await socialMediaElements.nth(i).getAttribute('href')).toContain('techglobal'); 
            expect(await socialMediaElements.nth(i).getAttribute('target')).toBe('_blank'); 
        }

        await page.waitForTimeout(2000); 
    });
});