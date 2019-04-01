
//test variables
var paperWeighting = [20, 30, 50];
var paperMarks = [74, 60, 68];
var paperMax = [80, 80, 100];
var possibleGrades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "E"]
var gradePercentages = [90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 0];
//math for the percentage of your paper this assignment is worth
function mathAssignmentPercentage(weighting, mark, maxMark) {
    return weighting * mark / maxMark;
}
//for ever assignment do the math and add all the totals to an array for later totalling
function mathPaperTotal() {
    var total = [];
    for (var i = 0; i < paperWeighting.length; i++) {
        total.push(mathAssignmentPercentage(paperWeighting[i], paperMarks[i], paperMax[i]));
    }
    return total;
}
//take an array and add all the values together returning the total
function mathArrayToNumber(list) {
    var total = 0.0;
    for (var i = 0; i < list.length; i++) {

        total += list[i];
    }
    return total;
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
console.log(passOrFail(mathArrayToNumber(mathPaperTotal())));


