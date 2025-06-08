import { test, expect } from '@playwright/test'

test('Soft Assertions', async({ page }) => {
    page.goto('https://www.techglobal-training.com/frontend/alerts'); 
    await expect.soft(page.getByRole('button', { name: 'Warning alert' })).toBeVisible(); 
    await expect.soft(page.getByRole('button', { name: 'Confirmation alert' })).toBeVisible(); 
    await expect.soft(page.getByRole('button', { name: 'Prompt alert' })).toBeVisible(); 
})