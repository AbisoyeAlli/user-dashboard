# DRPG Coding Test

This is the React coding test to access your skills and thought process when coming to build features in an application. 

Please send any questions you have through to paul.stevenson@drpgroup.com  

Please read through the task below and send through any questions you may have before getting started. Please timebox your effort to around 3-4 hours working through the task. (Excluding initial React setup) 

Your solution should be shared on a public Github repo showing a full commit history. Please share a link to the github repository to the above email address. 

## Our Expectation

Using the project provided we want you to integrate with a 3rd party API to pull in user data. There are a few pointers we would suggest to think about when coming up with your solutions: 

 - How we would be able to test this using Jest/Mocha in the future if we needed to? 

 - Don't always write everything yourself you can pull in other packages if you feel they are needed. 

 - You can use Hooks or standard react, but in either case the correct use of props and state is required, as well as correct component abstraction. 
 - This is not a UX test, focus on the functionality 
 - Include a README detailing starting the app, what you’d do if you had more time and your approach 
 - This is your opportunity to show us what you can do. Please don’t think of this as just completing the functional task – wow us. 
 
## Task

We want to create a simple dashboard using react and typescript for showing user data. Follow the layout provided below.

      
| Avatar    | First name            | Last name         | Email                         | Action          |
|-----------|-----------------------|-------------------|-------------------------------|-----------------|
| image       | Michael             | Lawson            | michael.lawson@reqres.in      | Edit Details
| image       | Lindsay             | Ferguson          | lindsay.ferguson@reqres.in    | Edit Details
| image       | Tobias              | Funke             | tobias.funke@reqres.in        | Edit Details
| ...       | ...                   | ...               | ...                           |  

 - Create a table using [https://reqres.in/] to fill it with user data, with pagination. 
 - We want to search users by email address and last name 
 - Implement a simple modal window when user click 'Edit Details' to edit details using [https://reqres.in/] 
 - In the edit details window we want to be able to update the selected user, and send it back to API 

## Bonus points
 - Cover your code with tests you think are most appropriate 
 - Error handling 
 - Handle the loading of the data 
 - Use Typescript 
