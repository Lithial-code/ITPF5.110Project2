var {question} = require('readline-sync');
//global variables for grade comparision
var possibleGrades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "E"];
var gradePercentages = [90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 0];
var allPapers = [];
//var for the Finite state machine in the CLI. True is on false is off. Should only be changed in the while loop
var BoolCLI = true;
//objects that hold the test data
var Assignment1 = {
    "name": "Clicker Game", //name
    "weighting": 20, //assessment weighting
    "mark": 73, //submission mark
    "totalmarksavailable": 77, //assessment mark
    "marksForThis": 0 //submission percentage
}
var Assignment2 = {
    "name": "Grader",
    "weighting": 30,
    "mark": 23,
    "totalmarksavailable": 34,
    "marksForThis": 0
}
var Assignment3 = {
    "name": "Movie Database",
    "weighting": 50,
    "mark": 7,
    "totalmarksavailable": 12,
    "marksForThis": 0
}
var IntroToProgramming = {
    "name": "ITPF5.110", //class the paper is in
    "assignments": [Assignment1, Assignment2, Assignment3], //holds all the assignments for the paper
    "totalMark": 0, //holds the total mark you have so far
    "grade": "", //This shows your current grade
    "pass": false //boolean that shows if you've passed the paper yet or not
}
function CustomPaper (name){
	this.name =name;
	this.assignments = [];
	this.totalMark = 0;
	var grade = "";
	var pass = false;
}
function CustomAssignmentObj(name, weighting,mark,totalmarksavailable){
	this.name = name;
	this.weighting = weighting;
	this.mark = mark;
	this.totalmarksavailable = totalmarksavailable;
	var marksForThis = 0;
}
//math for the submission percentage (Assessment Weighting x Submission Mark / Assessment Mark)
//TODO rename this submission percentage
function AssignmentPercentage(weighting, mark, maxMark) {
    return (weighting * mark / maxMark).toFixed(2);
}
//this puts the assignment percentage in the assignment object for safe keeping
function MarkAssignment(assignment) {
    assignment.marksForThis = AssignmentPercentage(assignment.weighting, assignment.mark, assignment.totalmarksavailable);
    return assignment;
}
//this function takes all the assignments and totals their points towards paper completion
//TODO this will likely be where i put the check to make sure the total isnt exceeding 100%
function MarkPaper(paper) {
    var totalMark = 0;
    for (var i = 0; i < paper.assignments.length; i++) {
        totalMark += parseFloat(paper.assignments[i].marksForThis); // solution to 2 digits
    }
    return totalMark;
}
//This function loops through the variables for possible grades and outputs what grade you got
function GradePaper(paper) {
    for (var i = 0; i < possibleGrades.length; i++) {
        if (paper.totalMark > gradePercentages[i]) {
            return possibleGrades[i];
        }
    }
}
//this function compares your total paper mark with the 50% threshold and tells you if you have passed
function PassChecker(paper) {
    return paper.totalMark > 50 ? "pass" : "fail";
}
//CLI STARTS HERE
while(BoolCLI) {
    console.log("Options: TestData | InputData | HTML | Quit");
    var input = question('');
         switch(input.toLowerCase()){
            case "testdata": RunPaperData(IntroToProgramming); break;
            case "inputdata" :{
			var paper = CreatePaper();
			RunPaperData(paper); 
			break;
			} 
            case "Html": break;
            case "quit":Quit(); break;
			default: console.log("Invalid Option. Please try again");
        }
}
//MAIN() RUN FUNCTIONS FROM HERE
function Quit(){
     console.log("Program stopping");
	 BoolCLI = false;
}
function CreatePaper(){
	var name = question('What class is this paper for?');
	var paper = new CustomPaper(name);
	var numberOfAssessmentsForPaper = parseInt(question('how many assessments does this paper have?'));
	for(var i = 0; i < numberOfAssessmentsForPaper; i++){
		var name = question('What is the name of this assessment?');
		var weighting = question('What is the weighting of this assessment');
		var marks = question('What mark did you get?');
		var totalmarksavailable = question('How many marks were available?');
		var assessment = new CustomAssignmentObj(name,weighting,marks,totalmarksavailable);
		paper.assignments.push(assessment);
	}
	//console.log(paper);
	return paper;
}	
//took the test data function and made it generic. Now i can run both test data and custom data through it.
function RunPaperData(paper){
for (var i = 0; i < paper.assignments.length; i++) {
        paper.assignments[i] = MarkAssignment(paper.assignments[i]);
    }
    //Mark the paper to recieve the total mark
    paper.totalMark = MarkPaper(paper);
    //grade the paper to see what grade you currently have
    paper.grade = GradePaper(paper);
    //see if you pass or not
    paper.pass = PassChecker(paper);
    //output to the user which paper scored what and how it changed your final grade
    for (var i = 0; i < paper.assignments.length; i++) {
        var assignment = paper.assignments[i];
        console.log(`For ${assignment.name} You scored ${assignment.mark}/${assignment.totalmarksavailable} adding ${assignment.marksForThis}% to your paper score`);
    }
    //Output to the user final score and if you passed or not
    console.log(`For ${paper.name} you scored ${paper.totalMark}% and you ${paper.pass} with a ${paper.grade} \n`);
}


//TODO Change assignment to Assessment
//TODO Validate data