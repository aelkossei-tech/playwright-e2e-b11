import { test, expect } from '@playwright/test'; 

test.describe('Playwright Project01 - To-Do List', () => {
    test.beforeEach(async({ page }) => {
        await page.goto('https://www.techglobal-training.com/frontend/todo-list');
    }); 

    test('Test Case 01 - Todo-App Modal Verification', async ({ page }) => {
        await expect(page.locator('[class^="section"]')).toBeVisible();
        await expect(page.getByText('My Tasks')).toBeVisible();
        await expect(page.locator('#input-add')).toHaveAttribute('type', 'text'); 
        await expect(page.locator('#add-btn')).toBeEnabled(); 
        await expect(page.locator('#search')).toBeEnabled(); 
        expect(await page.locator('[class^="panel-block"]').nth(1).innerText()).toBe('No tasks found!');
    });

    test('Test Case 02 - Single Task Addition and Removal', async({ page }) => {
        const taskText = 'Sign Up for TechGlobal'; 

        await page.locator('#input-add').fill(taskText); 
        await page.locator('#add-btn').click(); 

        await expect(page.getByText(taskText)).toBeVisible(); 
        expect(await page.locator('#panel span').last().count()).toEqual(1); 

        await page.locator('[class*="fa-circle-check"]').click(); 
        expect(page.locator('span[style*="line-through"]')).toHaveText(taskText); 

        await page.locator('.destroy').click(); 
        await expect(page.locator('[class*="has-text-danger"]>p')).toHaveText('No tasks found!'); 
    }); 

    test('Test Case 03 - Multiple Task Operations', async ({ page }) => {
        const addButton = page.locator('#add-btn'); 
        const todoListItems =
            ['Sign Up for TechGlobal',
                'Study for 6 months',
                'Master JavaScript & TypeScript',
                'Conquer Cypress & Playwright',
                'Become an SDET'];

        for (let i = 0; i < todoListItems.length; i++) {
            await page.locator('#input-add').fill(todoListItems[i]);
            await addButton.click();
        }

        expect(await page.locator('[class*="todo-item"]').allTextContents()).toEqual(todoListItems);

        const checkIcons = page.locator('[class*="fa-circle-check"]');
        const taskTexts = page.locator('[class*="todo-item"] span');
        const count = await checkIcons.count();
        
        for (let i = 0; i < count; i++) {
            await checkIcons.nth(i).click();
            await expect(taskTexts.nth(i)).toHaveClass('.fa-circle-check.has-text-success'); 
        }

        await page.locator('#clear').click();
        await expect(page.locator('[class*="has-text-danger"]>p')).toHaveText('No tasks found!');
    }); 
    
    test('Test Case 04 - Search and Filter Functionality in todo App', async({ page }) => {
        const addButton = page.locator('#add-btn'); 
        const todoItemsLocator = page.locator('[class*="todo-item"]'); 
        const todoListItems =
            ['Sign Up for TechGlobal',
                'Study for 6 months',
                'Master JavaScript & TypeScript',
                'Conquer Cypress & Playwright',
                'Become an SDET'];

        for (let i = 0; i < todoListItems.length; i++) {
            await page.locator('#input-add').fill(todoListItems[i]);
            await addButton.click();
        }
        // Counting the to-do list items and seeing how many there are --> 5
        await expect(todoItemsLocator).toHaveCount(todoListItems.length); 
        expect(await todoItemsLocator.allTextContents()).toEqual(todoListItems); 
        
        const searchInput = page.locator('#search'); 
        const lastTodoItem = todoListItems[todoListItems.length - 1]; 

        // Searching for the last to-do item 
        await searchInput.fill(lastTodoItem); 

        // Because of the searching feature --> our result is going to equal to 1 
        await expect(todoItemsLocator).toHaveCount(1); 
        await expect(todoItemsLocator).toHaveText(lastTodoItem); 
    }); 

    test('Test Case 05 - Task Validation and Error Handling', async({ page }) => {
        const searchInput = page.locator('#search'); 
        const addButton = page.locator('#add-btn'); 
        const todoListItems = page.locator('.todo-item'); 
        const todoListInput = page.locator('#input-add')
        const moreThan30 = 'Fix my LinkedIn Profile to find a job after the SDET program'; 
        const normalTask = 'Go to class'; 

        // Add empty task 
        await searchInput.fill(''); 
        await addButton.click(); 
        expect(todoListItems).toContainText('No tasks found!'); 
         
        // Add task exceeding 30 charcters
        await todoListInput.fill(moreThan30); 
        await addButton.click(); 
        await expect(page.locator('.notification')).toBeVisible(); 
        await expect(page.locator('.notification')).toHaveText('Error: Todo cannot be more than 30 characters!'); 

        // Add a normal task twice 
        await todoListInput.fill(normalTask); 
        await addButton.click(); 
        expect(todoListItems).toHaveCount(1); 

        await todoListInput.fill(normalTask); 
        await addButton.click();
        await expect(page.locator('.notification')).toBeVisible(); 
        await expect(page.locator('.notification')).toHaveText(`Error: You already have ${normalTask} in your todo list.`); 
    }); 
}); 