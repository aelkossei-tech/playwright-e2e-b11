import { chromium } from '@playwright/test'; 

// This will run once before execution 
async function globalSetup() {
    // Set browser-context-page
    const browser = await chromium.launch({
        headless: false
    }); 
    const context = await browser.newContext(); 
    const page = await context.newPage(); 

    await page.goto('https://playwright.dev/'); 

    console.log('This is GLOBAL SET UP is Running!'); 
    await page.waitForTimeout(3000); 
}

export default globalSetup;