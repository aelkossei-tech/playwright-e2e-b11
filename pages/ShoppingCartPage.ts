import path from "path";
import { type Locator, type Page } from "playwright/test";

export class ShoppingCartPage {
    readonly page: Page;
    readonly header: Locator;
    readonly courses: Locator;
    readonly addToCartBtn: Locator;
    readonly placeOrderBtn: Locator;
    readonly totalPrice: Locator;
    readonly discounts: Locator;
    readonly imgAltText: Locator;
    readonly prices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.getByRole('heading', { name: 'Available Courses'});
        this.courses = page.locator('[id^="course"]');
        this.addToCartBtn = page.getByRole('button', { name: 'Add to Cart'}); 
    }

    async waitForHeading() {
        await Promise.any([
            this.page.waitForSelector('h1'),
            this.page.waitForSelector('h2')
        ]);
    }
}