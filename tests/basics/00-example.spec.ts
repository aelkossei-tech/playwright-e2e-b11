import { test, expect } from '@playwright/test';

test.describe('Demo @Smoke', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('has titl', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link', async ({ page }) => {
    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
});



/*
1.) Go to wikipedia website 
2.) Search for "Playwright" 
3.) Validate the url contains "Playwright"
4.) Validate the title contains "Playwright"
4.) Validate the main heading is "Playwright"
*/

test('Validate Wiki Search', async ({ page }) => {
  test.slow();

  await page.goto('https://www.wikipedia.org/')

  await page.locator('#searchInput').fill('Playwright');

  await page.keyboard.press('Enter');

  await page.waitForTimeout(2000);
  /*
  OR: 
  await page.locator('.pure-button-primary-progressive').click(); 
  */
  await page.waitForURL('https://en.wikipedia.org/wiki/Playwright');

  /*
 ALL assertions --> expect(); 

 YOUR ANSWER: 
 await expect(page).toHaveURL('https://en.wikipedia.org/wiki/Playwright')
 await expect(page).toHaveTitle('Playwright - Wikipedia'); 
  */

  //  --> could store this as a variable: 
  const currentUrl = page.url();
  const currentTitle = await page.title();

  expect(currentUrl).toContain('Playwright');
  expect(currentTitle).toContain('Playwright');
  expect(await page.locator('#firstHeading').innerText()).toBe('Playwright');

  //const heading = page.locator('#firstHeading'); 
  // expect(await heading.innerText()).toBe('Playwright'); 
}); 