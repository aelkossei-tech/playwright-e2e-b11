import { test, expect } from '@playwright/test'; 
import { BasePage } from '../../pages/BasePage';
import { FrontendTestingPage } from '../../pages/FrontendTestingPage'; 

test.describe('Frontend Testing Page verification', () => {
    let basePage: BasePage; 
    let frontendTestingPage: FrontendTestingPage; 

    test.beforeEach(async({ page }) => {
        basePage = new BasePage(page); 
        frontendTestingPage = new FrontendTestingPage(page); 

        await page.goto('/'); 
        await basePage.selectFrontendOption(); 
    }); 

    test('Validate Headings', async() => {
        await expect(frontendTestingPage.frontendHeading).toBeVisible(); 
        await expect(frontendTestingPage.testingHeading).toBeVisible(); 
    });


    test('Validate that there are 10 practice cards', async() => {
        await frontendTestingPage.waitForHeading();  
        expect(await frontendTestingPage.practiceCards.count()).toBe(10); 
    });


    test('Validate that there are 10 projects with "Projects" heading', async() => {
        await expect(frontendTestingPage.projectsHeading).toBeVisible(); 
        expect(await frontendTestingPage.projectCards.count()).toBe(10); 
    });
});