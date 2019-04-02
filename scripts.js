//test variables
var paperWeighting = [20, 30, 50];
var paperMarks = [74, 60, 68];
//var paperMarks = [20, 10, 5];
var paperMax = [80, 80, 100];
var assessments = ["Clicker Game","Assessment","Movie Database"]
var totalArray = [];
var possibleGrades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "E"];
var gradePercentages = [90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 0];
var BSCClasses = ["ITIS5.450","ITDT5.228","ITIM5.238","ITPF5.110"];

//math for the percentage of your paper this assignment is worth
function AssignmentPercentage(weighting, mark, maxMark) {
    return weighting * mark / maxMark;
}
//for ever assignment do the math and add all the totals to an array for later totalling
function PaperTotal() {
    //var totalArray = []; //array to hold the marks for each assignment
    var percentage = 0.0; //variable to hold the final percentage
    for (var i = 0; i < paperWeighting.length; i++) {
        //holder variable that calls the function for one assignment.
        var assignmentPercentage = AssignmentPercentage(paperWeighting[i], paperMarks[i], paperMax[i]);
        //second line pushes the users mark into an array for processing later.
        totalArray.push(assignmentPercentage);
    }
    //take the array and add up all the values inside.
    for (var i = 0; i < totalArray.length; i++) {
        //console.log(percentage);        //debug line. used for testing
        percentage += totalArray[i]; //take the value at i and add it to the total paper percentage.
    }
    //console.log(`The total is ${percentage}`);
    return percentage;

}

//function that confirms grade and if you pass or fail
function PassOrFail(totalGrade) {
    //cycle through all the possibles grades. if total is greater than the number in the 
    //array then you get that mark.
    for (var i = 0; i < possibleGrades.length; i++) {
        if (totalGrade > gradePercentages[i]) {
            return `Your current grade is a ${possibleGrades[i]} and you ${totalGrade > 50?"pass":"fail"}`; //this conditional at the end is really cool
        }
    }
}





///
///GUi Methods Section
///
function AddRow(numberOfCells) {
    //get table element. Im using ID because theres only one
    var table = document.getElementById("table");
    //adds a new row at the bottom
    var newRow = table.insertRow(-1);
    //add a new content editable cell once per loop.
    //Loop number is based on variable passed in on html page
    for (var i = 0; i < numberOfCells; i++)
    {
        var newCell = newRow.insertCell(i).setAttribute("contentEditable", "true");
    } 
    
    //insert a new cell at the end of the row for the delete button
    //i called this out here for ease of access
    console.log(i);     //apparently JS scope is weird and i still = 5 out here
    var btnCell = newRow.insertCell(i);
    //call the add button method to create the delete button and then
    //put it in the cell at the end.
    btnCell.appendChild(AddDeleteButton(btnCell));
}

//function to add the delete button 
function AddDeleteButton(btnCell){
    var btn = document.createElement('input');
    btn.type = "button";
    btn.className = "btn";
    //sets the test in the button
    btn.value = "X"; 
    //sets the function for when the button is clicked.
    btn.onclick = function(){DeleteCurrentRow(btnCell)}; 
   return btn;
}
//function called when the delete button is called.
function DeleteCurrentRow(btnCell){
    //debug console log
    console.log("delete me");
    //get the buttons parent which is the row
    var parent = btnCell.parentNode;
  
    //debug for row count
    //console.log(parent.parentNode.children.length);

    // check if we have 3 or more rows in the table.
    //this is so we always have one row in the table
    if(parent.parentNode.children.length >=3){
        //go up one more level and then remove the whole row
    parent.parentNode.removeChild(parent);
    }
}
function AddDropDownBox()
{
    var list = document.createElement('input');
    list.type = "select";
    btn.className = "selector";
    btn.value = BSCClasses; 
   return list;
}

//console for testing
console.log(PassOrFail(PaperTotal()));