import { test, expect } from '@playwright/test'

test.describe('Mock Interview Questions Practice', () => {
   
    test('Test Case: Frontend - Pagination: Validate the main content', async({ page }) => {
        await page.goto('https://techglobal-training.com/frontend/pagination'); 
        await expect(page.getByRole('heading', { name: 'Pagination' })).toBeVisible(); 
        await expect(page.locator('#sub_heading')).toHaveText('World City Populations 2022'); 
        await expect(page.locator('#content')).toHaveText('What are the most populated cities in the world? Here is a list of the top five most populated cities in the world:'); 
    }); 

    test('Test Case: Frontend - Login: Validate the valid login', async({ page }) => {
        await page.goto('https://techglobal-training.com/frontend/login'); 
        page.locator('#username').fill('TechGlobal');
        page.locator('#password').fill('Test1234');
        page.getByRole('button', { name: 'LOGIN' }).click(); 
    }); 

    test('Test Case: Frontend - Login: Validate the invalid login with the wrong password', async({ page }) => {
        await page.goto('https://techglobal-training.com/frontend/login'); 
        page.locator('#username').fill('TechGlobal');
        page.locator('#password').fill('1234');
        await expect(page.locator('#error_message')).toHaveText('Invalid Password entered!'); 
    }); 

    test('Test Case: Frontend - Login: Validate the invalid login with the wrong username', async({ page }) => {
        await page.goto('https://techglobal-training.com/frontend/login'); 
        page.locator('#username').fill('Tech'); 
        page.locator('#password').fill('Test1234'); 
        await expect(page.locator('#error_message')).toHaveText('Invalid Username entered!'); 
    }); 
}); 