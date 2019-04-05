# ITPF5.110Project2
Assignment 2 for intro to programming

Task List  
*Application Description*  
- [ ] Create Application using javascript that tracks assessments for a single paper  
- [x] Requires student to enter the **Assessment's Weighting and Assessment's Mark** and their **Submission Mark** for each assessment.  
- [x] The tool will calculate the Submission Percentage and translate the Percentage to the **submission Grade**  
- [x] Once the Student has finished inputting the data the tool will then report on the students performance and provide a guide for the remained of the uncompleted assessments  
- [ ] The report should include the students **Current Paper Percentage**, the students **Current Paper Grade**, the students **Paper Status** and the **Minimum Target Percentage** to pass the remained of the paper   

*Paper Percentage*  
- [x] **Submission Percentage** is **Assessment Weighting** x **Submission Mark** / **Assessment Mark**  
- [x] **Paper Percentage** is the sum of the above from all papers  

*Paper Status*  

- [x] **Paper Status** is pass or fail which is 50%  

*Translate to Grade*  

- [x] **Grade** is represented by a letter according to the chart  

*User Input*  

- [x] Implement a UI that allows the student to input the details of assessments they have completed and been Graded on.   
- [ ] The User should be asked to input:  
    - [x] **Assessment Weighting** towards the papers overall Grade  
    - [x] **Assessment Mark** which is the total number of marks you can get for this assessment  
    - [x] **Submission Mark** which is the number of marks the student got  
- [ ] The interface should validate the user input.  
    - [ ] Non valid input should prompt the user to answer again.  
    - [ ] Valid Input Includes  
        - [ ] The total of the assessments weightings should not exceed 100%  
        - [ ] The Submission Mark should not exceed the Assessment Mark  
- [ ] **Optional:** Validate the data with no code duplication  
    - [ ] If you validate the inputs make sure the following inputs are positive decimals or intergers  
        - [ ] **Assessment Weighting**  
        - [ ] **Assessment Mark**  
        - [ ] **Submission Mark**  
- [x] The user interface should be inplemented as a console application  
- [ ] **Optional** Inplement a html/css gui   

*Reporting*  

- [ ] Extend the UI so that it reports to the user  
    - [ ] Current Paper Percentage  
    - [ ] Current Paper Grade  
    - [ ] Current Paper Status  
    - [ ] Target Percentage for the remained of the assessments  
    - [ ] **Optional** Display the Percentages and decimals in a structured format.  
        - [ ] Display and formate all Percentages with a %  
        - [ ] Display and format all Percentages with two decimal places  
        - [ ] Display and formate all decimal numbers to two decimal places  

*Delivery*   

- [ ] Comment the code  
- [ ] Make easy to use  
- [ ] Hand in as a zip including JS+Html+Css files  
    - [ ] Include a plain text .txt file of all the work  
    - [ ] Keep copy until its marked  
