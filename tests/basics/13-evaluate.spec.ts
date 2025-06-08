import { test, expect } from '@playwright/test'

test('Evaluate method/command', async({ page }) => {
    page.goto('https://www.google.com/'); 
    page.title(); // how you get title w/ Playwright 
    
    // PLaywright 
    expect(await page.title()).toBe('Google'); 
    expect(page.url()).toContain('google'); 
    
    
    const titleAndUrl = await page.evaluate(() => { 
        return [document.title, document.URL]; 
    }); 

    expect(titleAndUrl[0]).toBe('Google');
    expect(titleAndUrl[1]).toContain('google');
}); 