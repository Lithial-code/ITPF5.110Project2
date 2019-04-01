
//test variables
var paperWeighting = [20,30,50];
var paperMarks = [74,60,68];
var paperMax = [80,80,100];
var possibleGrades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "E"];
var gradePercentages = [90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 0];

//math for the percentage of your paper this assignment is worth
function AssignmentPercentage(weighting,mark,maxMark)
{
    return weighting * mark / maxMark;
}
//for ever assignment do the math and add all the totals to an array for later totalling
function PaperTotal()
{
    var totalArray = []; //array to hold the marks for each assignment
    var percentage = 0.0;//variable to hold the final percentage
    for(var i =0; i < paperWeighting.length; i++)
    {
        //holder variable that calls the function for one assignment.
        var assignmentPercentage = AssignmentPercentage(paperWeighting[i],paperMarks[i], paperMax[i]);
        //second line pushes the users mark into an array for processing later.
        totalArray.push(assignmentPercentage);
    }
 
    //take the array and add up all the values inside.
    for(var i =0; i < totalArray.length; i++)
    {
        //console.log(percentage);        //debug line. used for testing
        percentage += totalArray[i];    //take the value at i and add it to the total paper percentage.
    }
    //console.log(`The total is ${percentage}`);
    return percentage;
  
}
 
//function that confirms grade and if you pass or fail
function passOrFail(totalGrade) {
    //mark to bool for pass or fail
    var pass = totalGrade > 50;

    //cycle through all the possibles grades. if total is greater than the number in the 
    //array then you get that mark.
    for (var i = 0; i < possibleGrades.length; i++) {
        if (totalGrade > gradePercentages[i]) {
            return `Your current grade is a ${possibleGrades[i]} and pass equals ${pass}`;
        }
    }
}


function createCard() {
    //learning how dom manipulation works
    if(document.getElementById("testBTn") == null){
        var button = document.createElement("button");
        button.innerText = "I am a button";
        button.setAttribute("id", "testBTn");
        button.setAttribute("onclick", "testLog()");
        document.body.append(button);
    }
 
    var div = document.createElement("div");
    for (var i = 0; i < 4; i++) {
        var textArea = document.createElement("textArea");
        div.append(textArea);
    }
    div.setAttribute("class", "card:");
    document.body.append(div);
}

function testLog() {
    var textarea = document.getElementsByTagName("textarea");
    for (var i = 0; i < textarea.length; i++) {
        textarea[i].innerText = i;
    }
    console.log(`There are currently ${textarea.length} textareas`);
}
//console for testing
console.log(passOrFail(PaperTotal()));

