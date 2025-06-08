import { test, expect } from '@playwright/test'
import { ShoppingCartPage } from '../../pages/ShoppingCartPage';

test.describe('Playwirght Project 02 - Shopping Cart', () => {
   let shoppingCartPage: ShoppingCartPage; 
    
   test.beforeEach(async({ page }) => {
        shoppingCartPage = new ShoppingCartPage(page); 
        await page.goto('https://www.techglobal-training.com/frontend/shopping-cart'); 
    }); 

    test('Test Case 01 - Available Courses Section Validation', async({ page }) => {
        await expect(shoppingCartPage.header).toBeVisible(); 
        await shoppingCartPage.waitForHeading(); 
      //  expect(shoppingCartPage.courses.all()).toHaveLength(3); 
    }); 
})