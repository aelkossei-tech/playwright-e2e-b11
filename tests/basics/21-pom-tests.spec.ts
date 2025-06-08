import { test, expect } from "@playwright/test";
import { FrontendTestingPage } from "../../pages/FrontendTestingPage";
import { BackendTestingPage } from "../../pages/BackendTestingPage";

const frontendPracticePageTexts: string[] = [
    "HTML Elements",
    "Dynamic Elements",
    "Waits",
    "Dropdowns",
    "Alerts",
    "IFrames",
    "Multiple Windows",
    "Tables",
    "File Download & Upload",
    "Actions",
];

test.describe("POM Testing", () => {
    frontendPracticePageTexts.forEach((frontendPracticePageText) => {
        test(`Validate Frontend Testing "${frontendPracticePageText}" Page loading`, async ({
            page,
        }) => {
            await page.goto('/');

            const frontendTestingPage = new FrontendTestingPage(page);

            await frontendTestingPage.selectFrontendOption();

            await frontendTestingPage.clickOnPracticeCard(frontendPracticePageText);
            await frontendTestingPage.wait(0.5);

            expect(page.url()).toContain(frontendPracticePageText.replaceAll(' ', '-').toLowerCase());
        });
    });

    test('Validate Backend Testing adding new student', async ({ page }) => {
        const backendTestingPage = new BackendTestingPage(page);

        await backendTestingPage.selectBackendOption();
        await backendTestingPage.fillStudentFormAndSubmit(
            'Alex',
            'Smith',
            'alex@gmail.com',
            '10/10/2000',
            'Sodia Alvardo'
        );

        await backendTestingPage.wait(3); 
    });

});