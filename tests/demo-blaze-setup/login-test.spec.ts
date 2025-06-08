import { test, expect } from '@playwright/test';

/*
ALSO: 

test.use({
    headless: false,
    viewport: {
        height: 1080, 
        width: 1920
    }
})
*/

test('Login', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').fill('test');
    await page.locator('#loginpassword').fill('test');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();

    // Create & Save authentication storage state 
    await page.context().storageState({ path: './tests/auth/demo-blaze.json'});

    // await page.waitForTimeout(3000); 
});