import { test, expect } from '@playwright/test'

test('Element Properties', async({ page }) => {
        await page.goto('https://www.techglobal-training.com/frontend/html-elements');
        
        const paragrahsSections = page.locator('[data-identifier="Paragraphs"'); 

        console.log(await paragrahsSections.allInnerTexts()); // reutrns an array of strings 
        console.log(await paragrahsSections.innerText()); // returns just single string

        console.log(await paragrahsSections.innerHTML()); // returns all html elemwnts connected to the element 

        console.log(await paragrahsSections.allTextContents());
        console.log(await paragrahsSections.textContent()); 

        const inputBox = page.locator('#text_input1'); 
        expect(await inputBox.getAttribute('value')).toBeFalsy(); 

        await inputBox.fill('Batch-11'); 

        expect(await inputBox.getAttribute('value')); // null
        // OR 
        expect(await inputBox.inputValue()).toBe('Batch-11')


}); 