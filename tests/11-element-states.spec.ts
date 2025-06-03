import { test, expect } from '@playwright/test'

test('', async({ page }) => {
    await page.goto('https://www.techglobal-training.com/frontend/html-elements'); 

    const registerButton = page.locator('#register_button'); 
    console.log(await registerButton.isVisible());
   // console.log(await registerButton.isChecked()); --> NOT a checkbox or radio button
    console.log(await registerButton.isDisabled()); // false
    console.log(await registerButton.isEnabled()); // true 
    // console.log(await registerButton.isEditable());
    console.log(await registerButton.isHidden());

    expect(registerButton).toBeVisible(); 
})

test('Example', async({ page }) => {
    await page.goto('https://bananarepublicfactory.gapfactory.com/'); 

    page.waitForSelector('#onetrust-group=container'); 
    const isModalVisible = await page.locator('#onetrust-group=container').isVisible(); 
    console.log(isModalVisible); // true 
    
    if(isModalVisible) {
        await page.locator('aria-label="Close"').click(); 
    }
}); 