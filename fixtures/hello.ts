import { test as base } from '@playwright/test'

type myFixture = {
    hello: string
}

/*
SAME THING AS: 

type Person = {
    fname: string, 
    age: number 
}
*/

// We are re-identifying Playwright test w/ an additional hello fixture 
export const test = base.extend<myFixture>({
    hello: async({}, use) => {

        const greeting = 'Hello from fixture'; 
        await use(greeting); 
    }
})