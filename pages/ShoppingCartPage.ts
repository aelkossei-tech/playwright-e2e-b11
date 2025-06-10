import path from "path";
import { type Locator, type Page } from "playwright/test";

export class ShoppingCartPage {
    readonly page: Page;
    readonly firstHeading: Locator;
    readonly courses: Locator;
    readonly courseImages: Locator;
    readonly courseTitles: Locator;  
    readonly schoolTag: Locator; 
    readonly coursePrice: Locator; 
    readonly addToCartBtn: Locator; 
    readonly itemsAddedToCartHeading: Locator; 
    readonly placeOrderBtn: Locator; 
    readonly totalPrice: Locator; 
    readonly courseAddBtn: Locator; 
    readonly cartItemImage: Locator; 
    readonly cartItemText: Locator; 
    readonly successMessage: Locator; 
    readonly cartItemPrices: Locator;
    readonly emptyCart: Locator; 

    constructor(page: Page) {
        this.page = page;
        this.firstHeading = page.getByRole('heading', { name: 'Available Courses'});
        this.courses = page.locator('[id^="course"]');
        this.courseImages = page.locator('[id*="course"] img'); 
        this.courseTitles = page.locator('[id*="course"] h3');
        this.schoolTag = page.locator('.my-3'); 
        this.coursePrice = page.getByTestId('full-price'); // this is the course price stated on each course column 
        this.addToCartBtn = page.getByRole('button', { name: 'Add to Cart' }); 
        this.itemsAddedToCartHeading = page.locator('.mb-2'); 
        this.placeOrderBtn = page.getByRole('button', { name: 'Place Order' }); 
        this.totalPrice = page.locator('#total-price'); // this is the price at the end of the cart card [Total: $xx]
        this.courseAddBtn = page.locator('[id*="course"] button'); 
        
        this.cartItemImage = page.locator('.course-card img'); 
        this.cartItemText = page.locator('.course-card-content'); 
        this.successMessage = page.locator('.is-success'); 

        this.cartItemPrices = page.getByTestId('final-price'); // this is the price stated in the cart w/ discount 
    }

    async waitForHeading() {
        await Promise.any([
            this.page.waitForSelector('h1'),
            this.page.waitForSelector('h2')
        ]);
    }

    async clickOnCourseAddButton(index: number) {
        await this.courseAddBtn.nth(index).click(); 
    }
}