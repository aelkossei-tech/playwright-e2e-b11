import { test, expect } from "../../fixtures/test-data-fixtures";
import compareResponseWithRequest from "../../utils/compareResponseWithRequest";
import { executeQuery } from "../../utils/dbUtils";

test.describe.configure({ mode: "serial" });

test.describe("API-Automation Project 01", () => {
    let studentID; 

    test('Retrieve all students and validate the response', async({ request }) => { // Playwright gives you access to a special helper object --> request
        // request ==> built-in fixture lets you make HTTP calls --> actually calls apiRequest.newContext()
        const response = await request.get(process.env.API_ENDPOINT!); 
        expect(response.status()).toBe(200); // This is where we're validating the status code to be 200 

        const students = await response.json(); 
        expect(students.length).toBeGreaterThanOrEqual(2); // Using the JSON response to see how many students 
        
        for(const student of students) {
            expect(student).toHaveProperty("STUDENT_ID"); // used toHaveProperty to see students that are present have an id 
        }
    }); 

    test('Create a new student and validate the response', async({ request, newStudent }) => {
        const response = await request.post(process.env.API_ENDPOINT!, { data: newStudent }); // instead of using "get" --> "post"
        // using the data from newStudent test data 
        const responseBody = await response.json(); // --> take the response we generated above and makes it readable (json)
        expect(response.status()).toBe(201); // validating that the status code is 201 

        expect(responseBody.STUDENT_ID).toBeGreaterThan(2);
        /*
        expect(responseBody.DOB).toBe(newStudent.DOB);
        expect(responseBody.EMAIL).toBe(newStudent.EMAIL);
        expect(responseBody.FIRST_NAME).toBe(newStudent.FIRST_NAME);
        expect(responseBody.LAST_NAME).toBe(newStudent.LAST_NAME);
        expect(responseBody.INSTRUCTOR_ID).toBe(newStudent.INSTRUCTOR_ID); 
        */
        compareResponseWithRequest(responseBody, newStudent);

        const name = responseBody.FIRST_NAME;
        studentID = responseBody.STUDENT_ID;
    }); 

    test('Retrieve the newly created student and validate the response', async ({ request, newStudent }) => {
        const response = await request.get(`${process.env.API_ENDPOINT!}/${studentID}`);
        const responseBody = await response.json();

        expect(response.status()).toBe(200);
        compareResponseWithRequest(responseBody, newStudent); 
    });

    test('Update the newly created student with a different instructor and validate the response', async ({ request, updatedStudent }) => {
        const response = await request.put(`${process.env.API_ENDPOINT!}/${studentID}`, { data: updatedStudent });
        const responseBody = await response.json();
       
        expect(response.status()).toBe(200);
        expect(responseBody.message).toBe(`Successfully updated the student with the STUDENT_ID: ${studentID}`)
    });     

    test('Delete the newly created student and validate the response', async({ request, updatedStudent }) => {
        const response = await request.delete(`${process.env.API_ENDPOINT!}/${studentID}`, { data: updatedStudent });

        expect(response.status()).toBe(204);
    }); 
}); 