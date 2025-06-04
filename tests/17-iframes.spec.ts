import { test, expect } from '@playwright/test'

test('Iframe Handling @Regression', async({ page }) => {
    await page.goto('https://www.techglobal-training.com/frontend/iframes'); 
    const iFrameForm = page.frameLocator('#form_frame'); 

    const [fname, lname] = ['John', 'Doe']; 

    await iFrameForm.locator('#first-name').fill(fname); 
    await iFrameForm.locator('#last-name').fill(lname); 
    await iFrameForm.locator('#submit').fill(lname); 

    await expect(page.locator('#result')).toHaveText(`You entered: ${fname} ${lname}`); 
})