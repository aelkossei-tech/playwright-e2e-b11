import { chromium, test } from "@playwright/test";

test('Setting a page @Regression', async() => {
    const browser = await chromium.launch(); 
    const context = await browser.newContext(); 
    const page = await context.newPage(); 

    await page.goto('https://www.techglobal-training.com/'); 
}); 

test('Visting a page @Regression', async({ page }) => {
    await page.goto('https://www.techglobal-training.com/'); 
})