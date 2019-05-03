//global variables for grade comparision
var possibleGrades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "E"];
var gradePercentages = [90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 0];
var AllPapers = [];
var Assessments = [{
        "name": "Clicker Game", //name
        "assessmentWeighting": 20, //assessment weighting
        "submissionMark": 74, //submission mark
        "assessmentMark": 80, //assessment mark
        "submissionPercentage": 0, //submission percentage
        "assessmentGrade": ""
    },
    {
        "name": "Grader",
        "assessmentWeighting": 30,
        "submissionMark": 60,
        "assessmentMark": 80,
        "submissionPercentage": 0,
        "assessmentGrade": ""
    },
    {
        "name": "Movie Database",
        "assessmentWeighting": 50,
        "submissionMark": 68,
        "assessmentMark": 100,
        "submissionPercentage": 0,
        "assessmentGrade": ""
    }
]
var IntroToProgramming = {
    "name": "ITPF5.110", //class the paper is in
    "assessments": Assessments, //holds all the assessments for the paper
    "totalMark": 0, //holds the total mark you have so far
    "subGrade": "", //This shows your current grade
    "numOfAssessments": 3, // to make the test data consistant with the created papers
    "pass": false //boolean that shows if you've passed the paper yet or not
}
var BetterKeys = [" Name ", " Weighting ", " Mark ", "/ Mark", " % ", " Grade "]

function AssObj(name, assessmentWeighting, submissionMark, assessmentMark) {
    this.name = name;
    this.assessmentWeighting = assessmentWeighting;
    this.submissionMark = submissionMark;
    this.assessmentMark = assessmentMark;
    this.submissionPercentage = 0;
    this.assessmentGrade = "";
}
//math for the submission percentage (Assessment Weighting x Submission Mark / Assessment Mark)
function AssignmentPercentage(assessmentWeighting, submissionMark, maxMark) {
    return `${(assessmentWeighting * submissionMark / maxMark).toFixed(2)}%`;
}
//this puts the assignment percentage in the assignment object for safe keeping
function MarkAssignment(assignment) {
    assignment.submissionPercentage = AssignmentPercentage(assignment.assessmentWeighting, assignment.submissionMark, assignment.assessmentMark);
    return assignment;
}
//this function takes all the assessments and totals their points towards paper completion
//TODO this will likely be where i put the check to make sure the total isnt exceeding 100%
function MarkPaper(paper) {
    var totalMark = 0;
    for (var i = 0; i < paper.assessments.length; i++) {
        totalMark += parseFloat(paper.assessments[i].submissionPercentage); // solution to 2 digits
    }
    return totalMark;
}
//This function loops through the variables for possible grades and outputs what grade you got
function PaperGrader(paper) {
    for (var i = 0; i < possibleGrades.length; i++) {
        if (paper.totalMark >= gradePercentages[i]) {
            return possibleGrades[i];
        }
        if (paper.subGrade == "") {
            paper.totalMark = 0;
            return "E";
        }
    }
}
//TODO comment this
function AssessmentGrader(assessment) {
    for (var i = 0; i < possibleGrades.length; i++) {
        var subMark = (assessment.submissionMark / assessment.assessmentMark) * 100;
        if (subMark >= gradePercentages[i]) {
            console.log(possibleGrades[i]);
            return possibleGrades[i];
        }
    }
}
//this function compares your total paper mark with the 50% threshold and tells you if you have passed
function PassChecker(paper) {
    return paper.totalMark > 50 ? "pass" : "fail";
}
function ClearTable(table){
    while(table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }
}
function AddNewAssess(table){
    var assessments = AllPapers.assessments;
    for (var i = 0; i < assessments.length; i++) {
        assessments[i]["assessmentGrade"] = AssessmentGrader(Assessments[i]);
        AddToTable(table, assessments[i]);
    }
}
function PopulatePapers(){
    var dropDown = document.getElementById("PapersDropdown");
    for(paper in AllPapers){
        var option = document.createElement("option");
        option.setAttribute("value",AllPapers[paper].name);
        option.innerHTML = AllPapers[paper].name;
        dropDown.appendChild(option);
    }
}
function AddFromInputsToArray() {
    var name = document.getElementById("Name");
    var weighting = document.getElementById("Weighting");
    var submissionMark = document.getElementById("SubMark");
    var assessmentMark = document.getElementById("AssessMark");
    var assessment = new AssObj(name.value,weighting.value,submissionMark.value,assessmentMark.value);
    Assessments.push(assessment);
    AddNewAssess(table);
    GenerateTableHead(table, BetterKeys);
}

function GenerateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (var key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function AddToTable(table, data) {
    let row = table.insertRow();
    for (element in data) {
        let cell = row.insertCell();
        let text = document.createTextNode(data[element]);
        cell.appendChild(text);
    }
}
//AllPapers.push(IntroToProgramming);
PopulatePapers();
var table = document.getElementById('paperTable');
let data = BetterKeys;
GenerateTableHead(table, data);
AddNewAssess(table);
