import { Locator, Page } from "@playwright/test";

export class PaginationPage {
    readonly page: Page; 
    readonly mainHeading: Locator; 
    readonly tableHeaders: Locator; 



    constructor(page: Page) {
        this.page = page; 
        this.mainHeading = page.getByRole('heading', { name: 'Inventory' }); 
        this.tableHeaders = page.locator('.header'); 
    }
}