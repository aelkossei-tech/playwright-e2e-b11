import { test, expect } from '@playwright/test'
import { ShoppingCartPage } from '../../pages/ShoppingCartPage';

test.describe('Playwirght Project 02 - Shopping Cart', () => {
   let shoppingCartPage: ShoppingCartPage; 
    
   test.beforeEach(async({ page }) => {
        shoppingCartPage = new ShoppingCartPage(page); 
        await page.goto('https://www.techglobal-training.com/frontend/shopping-cart'); 
    }); 

  test('Test Case 01 - Available Courses Section Validation', async() => {
    // Validate heading - "Available Courses"
    await expect(shoppingCartPage.firstHeading).toBeVisible();
    await expect(shoppingCartPage.firstHeading).toContainText('Available Courses');

    // Validate that courses are displayed
    expect(shoppingCartPage.courses).toHaveCount(3);

    // Validate that each course has: 1.) an image  2.) name  3.) TechGlobal School tag  4.) a price more than 0 
    const courseCount = await shoppingCartPage.courses.count();

    for (let i = 0; i < courseCount; i++) {
      await expect(shoppingCartPage.courseImages.nth(i)).toBeVisible();
      await expect(shoppingCartPage.courseTitles.nth(i)).toBeVisible();
      await expect(shoppingCartPage.schoolTag.nth(i)).toBeVisible();
      expect(await shoppingCartPage.schoolTag.nth(i).innerText()).toMatch('TechGlobal School');

      const priceText = await shoppingCartPage.coursePrice.nth(i).innerText();
      const price = Number(priceText.replace(/[^0-9.]/g, ''));
      expect(price).toBeGreaterThan(0);
    };

    // Validate that the first 2 course have discount tags 
    await expect(shoppingCartPage.courses.nth(0).getByTestId('discount')).toBeVisible();
    await expect(shoppingCartPage.courses.nth(1).getByTestId('discount')).toBeVisible();

    // Validate that "Add to Cart" button is displayed + enabled +  has text "Add to Cart" under each course
    for (let i = 0; i < courseCount; i++) {
      await expect(shoppingCartPage.addToCartBtn.nth(i)).toBeVisible();
      await expect(shoppingCartPage.addToCartBtn.nth(i)).toBeEnabled();
      await expect(shoppingCartPage.addToCartBtn.nth(i)).toHaveText('Add to Cart');
    }
  });

  test('Test Case 02 - Cart Section Validation', async() => {
    // Validate that "Items Added to Cart" heading is displayed
    await expect(shoppingCartPage.itemsAddedToCartHeading).toBeVisible(); 
    await expect(shoppingCartPage.itemsAddedToCartHeading).toHaveText('Items Added to Cart'); 

    // Validate that the total price is "$0" by default 
    expect(await shoppingCartPage.totalPrice.innerText()).toEqual("Total: $0"); 

    // Validate that the "Place Order" button is displayed, disenabled, and has text "Place Order "
    await expect(shoppingCartPage.placeOrderBtn).toBeVisible(); 
    await expect(shoppingCartPage.placeOrderBtn).toBeDisabled(); 
    await expect(shoppingCartPage.placeOrderBtn).toHaveText('Place Order'); 
  }); 

  test('Test Case 03 - Add a Course to the Cart and Validate', async({ page }) => {
    // Click on "Add to Cart" for one of the courses. 
    await shoppingCartPage.clickOnCourseAddButton(2); 

    // Validate that the course is displayed in cart, with its: image + name + discount (if available)
    await expect(shoppingCartPage.cartItemImage).toBeVisible();
    await expect(shoppingCartPage.cartItemText).toBeVisible();

    // Validate that the course price is added to total price 
    await expect(shoppingCartPage.cartItemPrices).toContainText('$10'); 

    // Click on "Place Order" button 
    await shoppingCartPage.placeOrderBtn.click(); 

    // Validate success message 
    await expect(shoppingCartPage.successMessage).toBeVisible(); 
    await expect(shoppingCartPage.successMessage).toHaveText('Your order has been placed.'); 

    // Validate that the cart is empty
    expect(await shoppingCartPage.totalPrice.innerText()).toEqual("Total: $0"); 
  }); 

  test('Test Case 04 - Add Two Courses to the Cart and Validate', async({ page }) => {
   // Click on "Add to Cart" for two of the courses 
    await shoppingCartPage.clickOnCourseAddButton(2); 
    await shoppingCartPage.clickOnCourseAddButton(1); 

    // Validate that courses are displayed in cart w/: image + name + discount (if available)
    const cartItemCount = await shoppingCartPage.cartItemText.count(); // 2

    for(let i = 0; i < cartItemCount; i++) {
      await expect(shoppingCartPage.cartItemImage.nth(i)).toBeVisible(); 
      await expect(shoppingCartPage.cartItemText.nth(i)).toBeVisible(); 

      const discountedCourse = shoppingCartPage.cartItemText.nth(i).getByTestId('discount'); 
      if(await discountedCourse.count()) {
        await expect(discountedCourse).toBeVisible(); 
      }
    }

    // Validate that the course prices are added to the total price excluding the discount amounts
    const coursePrice1 = await shoppingCartPage.coursePrice.nth(2).innerText(); // '$10'
    const coursePrice2 = await shoppingCartPage.coursePrice.nth(1).innerText(); // '$80'
    const expectedTotalPriceNumber = Number(coursePrice1.replace(/\D/g, '')) + Number(coursePrice2.replace(/\D/g, '')); // $90
    
    const displayedTotal =  await shoppingCartPage.totalPrice.innerText(); // $72
    const displayedTotalPriceNumber = Number(displayedTotal.replace(/\D/g, '')); 
    
    expect(expectedTotalPriceNumber).toEqual(90); 
    expect(expectedTotalPriceNumber).toBeGreaterThan(displayedTotalPriceNumber); 

    // Click on "Place Order" button; 
   await shoppingCartPage.placeOrderBtn.click(); 

    // Validate success message 
    await expect(shoppingCartPage.successMessage).toBeVisible(); 
    await expect(shoppingCartPage.successMessage).toHaveText('Your order has been placed.'); 

    // Validate that the cart is empty
    expect(await shoppingCartPage.totalPrice.innerText()).toEqual("Total: $0"); 
  }); 
  
  test('Test Case 05 - Add All Three Courses to the Cart and Validate', async({ page }) => {
    // Add all 3 courses to the cart + validate that their images + text + discount (if available) are displayed 
    const addCourses = await shoppingCartPage.courseAddBtn.count(); 
    
    for(let i = 0; i < addCourses; i++) {
      await shoppingCartPage.courseAddBtn.nth(i).click(); 

      await expect(shoppingCartPage.cartItemImage.nth(i)).toBeVisible(); 
      await expect(shoppingCartPage.cartItemText.nth(i)).toBeVisible(); 

      const discountedCourse = shoppingCartPage.cartItemText.nth(i).getByTestId('discount'); 
     
      if(await discountedCourse.count()) {
        await expect(discountedCourse).toBeVisible(); 
      }
    }

    // Validate that the course prices are added to the total - excluding the discount 
    const coursePrice1 = await shoppingCartPage.coursePrice.nth(0).innerText(); // '$100'
    const coursePrice2 = await shoppingCartPage.coursePrice.nth(1).innerText(); // '$80'
    const coursePrice3 = await shoppingCartPage.coursePrice.nth(2).innerText(); // '$10'
    const expectedTotalPriceNumber = 
      Number(coursePrice1.replace(/\D/g, '')) 
    + Number(coursePrice2.replace(/\D/g, '')) 
    + Number(coursePrice3.replace(/\D/g, '')); // ==> $190
    
    const displayedTotal =  await shoppingCartPage.totalPrice.innerText(); // $162
    const displayedTotalPriceNumber = Number(displayedTotal.replace(/\D/g, '')); 
    
    expect(expectedTotalPriceNumber).toEqual(190); 
    expect(expectedTotalPriceNumber).toBeGreaterThan(displayedTotalPriceNumber); 
    
    // Click on "Place Order" button 

    await shoppingCartPage.placeOrderBtn.click(); 

    // Validate success message 
    await expect(shoppingCartPage.successMessage).toBeVisible(); 
    await expect(shoppingCartPage.successMessage).toHaveText('Your order has been placed.'); 

    // Validate that the cart is empty
    expect(await shoppingCartPage.totalPrice.innerText()).toEqual("Total: $0"); 
  }); 
});