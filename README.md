# ITPF5.110Project2
Assignment 2 for intro to programming

Task List  
*Application Description*  
- [ ] Create Application using javascript that tracks assessments for a single paper  
- [ ] Requires student to enter the **assessment's weighting and assessment's mark** and their **submission mark** for each assessment.  
- [ ] The tool will calculate the submission percentage and translate the percentage to the **submission grade**  
- [ ] Once the Student has finished inputting the data the tool will then report on the students performance and provide a guide for the remained of the uncompleted assessments  
- [ ] The report should include the students **current paper percentage**, the students **current paper grade**, the students **paper status** and the **minimum target percentage** to pass the remained of the paper   
*Paper Percentage*  
- [ ] **Submission percentage** is **assessment weighting** x **submission mark** / **assessment mark**  
- [ ] **Paper percentage** is the sum of the above from all papers  
*Paper Status*  
- [ ] **Paper Status** is pass or fail which is 50%  
*Translate to grade*  
- [ ] **grade** is represented by a letter according to the chart  
*User Input*  
- [ ] Implement a UI that allows the student to input the details of assessments they have completed and been graded on.   
- [ ] The User should be asked to input  
    - [ ]**assessment weighting** towards the papers overall grade  
    - [ ]**assessment mark** which is the total number of marks you can get for this assessment  
    - [ ]**submission mark** which is the number of marks the student got  
- [ ] The interface should validate the user input.  
    - [ ] Non valid input should prompt the user to answer again.  
    - [ ] Valid Input Includes  
        - [ ] The total of the assessments weightings should not exceed 100%  
        - [ ] The submission mark should not exceed the assessment mark  
- [ ]**Optional:** Validate the data with no code duplication  
    - [ ]if you validate the inputs make sure the following inputs are positive decimals or intergers  
        - [ ] **assessment weighting**  
        - [ ] **assessment mark**  
        - [ ] **submission mark**  
- [ ] The user interface should be inplemented as a console application  
- [ ]**Optional** Inplement a html/css gui   
*Reporting*  
- [ ]Extend the UI so that it reports to the user  
    - [ ] Current paper percentage  
    - [ ] current paper grade  
    - [ ] current paper status  
    - [ ] target percentage for the remained of the assessments  
    - [ ]**Optional** Display the percentages and decimals in a structured format.  
        - [ ] Display and formate all percentages with a %  
        - [ ] Display and format all percentages with two decimal places  
        - [ ] Display and formate all decimal numbers to two decimal places  
*Delivery*   
- [ ] Comment the code  
- [ ] Make easy to use  
- [ ] Hand in as a zip including JS+Html+Css files  
    - [ ]include a plain text .txt file of all the work  
    - [ ]keep copy until its marked  
