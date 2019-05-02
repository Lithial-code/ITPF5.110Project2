var {
    question
} = require('readline-sync');

//global variables for grade comparision
var possibleGrades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "E"];
var gradePercentages = [90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 0];
//var for the Finite state machine in the CLI. True is on false is off. Should only be changed in the while loop
var BoolCLI = true;
var AllPapers = [];
//objects that hold the test data
var Assignment1 = {
    "name": "Clicker Game", //name
    "assessmentWeighting": 20, //assessment weighting
    "submissionMark": 74, //submission mark
    "assessmentMark": 80, //assessment mark
    "submissionPercentage": 0, //submission percentage
    "assessmentGrade": ""
}
var Assignment2 = {
    "name": "Grader",
    "assessmentWeighting": 30,
    "submissionMark": 60,
    "assessmentMark": 80,
    "submissionPercentage": 0,
    "assessmentGrade": ""
}
var Assignment3 = {
    "name": "Movie Database",
    "assessmentWeighting": 50,
    "submissionMark": 68,
    "assessmentMark": 100,
    "submissionPercentage": 0,
    "assessmentGrade": ""
}
var IntroToProgramming = {
    "name": "ITPF5.110", //class the paper is in
    "assessments": [Assignment1, Assignment2, Assignment3], //holds all the assessments for the paper
    "totalMark": 0, //holds the total mark you have so far
    "subGrade": "", //This shows your current grade
    "numOfAssessments": 3, // to make the test data consistant with the created papers
    "pass": false //boolean that shows if you've passed the paper yet or not
}

function CustomPaper(name) {
    this.name = name;
    this.assessments = [];
    this.totalMark = 0;
    this.numOfAssessments = 0;
    this.subGrade = "";
    this.pass = false;
    this.targetPercentage = 50;
}

function AssObj(name, assessmentWeighting, submissionMark, assessmentMark) {
    this.name = name;
    this.assessmentWeighting = assessmentWeighting;
    this.submissionMark = submissionMark;
    this.assessmentMark = assessmentMark;
    this.submissionPercentage = 0;
    this.assessmentGrade = "";
}
//math for the submission percentage (Assessment Weighting x Submission Mark / Assessment Mark)
//TODO rename this submission percentage
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
            return possibleGrades[i];
        }
    }
}
//this function compares your total paper mark with the 50% threshold and tells you if you have passed
function PassChecker(paper) {
    return paper.totalMark > 50 ? "pass" : "fail";
}

function NumberQuestion(questionString) {
    var questionBool = true; //for the while loop
    while (questionBool) {
        var myQuestion = question(questionString);
        var newQuestion = 0;
        for(var i = 0; i < myQuestion.length; i++){
            //better validation. dig through the string and pull out all the numbers. concat them and then parse them
            if(!isNaN(myQuestion[i])){
                newQuestion += myQuestion[i];
            }
        }
        newQuestion = parseInt(newQuestion);
        if (!isNaN(newQuestion)) {
            return newQuestion;
        } else {
            console.log("Answer is not a number. Please try again.")
        }
    }
}

function TextQuestion(questionString) {
    var questionBool = true; //for the while loop
    while (questionBool) {
        var myQuestion = question(questionString);
        if (isNaN(myQuestion)) {
            return myQuestion;
        } else {
            console.log("Please input text instead.")
        }
    }
}

function NumberOrNoQuestion(questionString) {
    var questionBool = true; //for the while loop
    while (questionBool) {
        var myQuestion = question(questionString);
        if (!isNaN(myQuestion)) {
            return myQuestion;
        } else if (isNaN(myQuestion) && (myQuestion == 'n' || myQuestion == 'N')) {
            return myQuestion;
        } else {
            console.log("Please input a number instead.")
        }
    }
}
/////////////////////////////////////////////////////////////////////////////
//CLI STARTS HERE
AllPapers.push(IntroToProgramming);
RunData();
while (BoolCLI) {
    console.log("Options: (C)reatepaper | (E)ditData | (R)unMarking | (S)howData | (Q)uit");
    var input = TextQuestion('');
    switch (input.toLowerCase()) {
        case "createpaper":
        case "c":
            {
                CreatePaper();
                console.table(AllPapers);
                break;
            }
        case "runmarking":
        case "r":
            {
                RunData();
                break;
            }

        case "editdata":
        case "e":
            EdittingData();

            break;
        case "showdata":
        case "s":
            {
                ShowData();
                break
            };
        case "quit":
        case "q":
            Quit();
            break;
        default:
            console.log("Invalid Option. Please try again");
    }
}


/////////////////////////////////////////////////////////////////////////////
//MAIN() RUNNING FUNCTIONS FROM HERE
function Quit() {
    console.log("Program stopping");
    BoolCLI = false;
}

function EdittingData() {
    var paper = SelectPaper();
    var continueEditing = true;
    while (continueEditing) {
        var assessment = SelectAssessment(paper);
        EditData(assessment, paper);
        paper.targetPercentage -= parseInt(assessment.submissionPercentage);
        if (paper.targetPercentage < 0) {
            paper.targetPercentage = 0;
        }
        var continueEditingString = TextQuestion(`Would you like to select another? y | n:`);
        continueEditing = (continueEditingString.toLowerCase() == "y" || continueEditingString.toLowerCase() == "yes");
    }
}

function EditData(assessment, paper) {
    console.table(assessment);
    assessment.name = TextQuestion('What is the name of this assessment? :');
    var validMarks = false;
    while(!validMarks){
        assessment.submissionMark = NumberQuestion('What mark did you get? :');
        assessment.assessmentMark = NumberQuestion('How many marks were available? :');
        if(assessment.submissionMark <= assessment.assessmentMark){
            validMarks = true;
        }
        else{
            console.log("Invalid Mark Input. Please ensure you entered marks are less than the maximum for the assessment");
        }
    }
    RunData();
    console.table(paper.assessments);

}

function RunData() {
    if (AllPapers.length != 0) {
        for (var i = 0; i < AllPapers.length; i++) {
            RunPaperData(AllPapers[i]);
        }
    };
}

function ShowData() {
    if (AllPapers.length == 0) {
        AllPapers.push(IntroToProgramming);
    }
    console.table(AllPapers);
    var wouldYouLikeToSeeMore = true;
    while (wouldYouLikeToSeeMore) {
        var selector = NumberOrNoQuestion("What is the index of the paper you wanted to see? or n to cancel: ");
        if (selector.toLowerCase == 'n') {
            break;
        } 
        else if(selector > AllPapers.length){
            console.log("This number is higher than the number of papers. Please try again");
        }
        else {
            if (!isNaN(selector)) {
                console.table(AllPapers[selector].assessments);
                var wouldYouLikeToSeeMoreString = TextQuestion(`Would you like to select another? :`);
                wouldYouLikeToSeeMore = (wouldYouLikeToSeeMoreString.toLowerCase() == "y" || wouldYouLikeToSeeMoreString.toLowerCase() == "yes");
            }
            else{
                break;
            }
        }
    }


}

function SelectPaper() {
    console.table(AllPapers);
    console.log(`There are currently ${AllPapers.length} papers to choose from`);
    var paperSelector = NumberQuestion("Which paper did you want to input marks to? (Index) :");
    return AllPapers[paperSelector];
}

function SelectAssessment(paper) {
    console.table(paper.assessments);
    console.log(`There are currently ${paper.assessments.length} assessments to choose from`);
    var assessSelector = NumberQuestion("Which assessment did you want to input marks to? (Index) :");
    return paper.assessments[assessSelector];
}

function CreateBlankAssessment(paper) {
    var name = `assessment${paper.assessments.length}`
    var assessmentWeighting = NumberQuestion(`What is the weighting of assessment ${paper.assessments.length+1}? `).toFixed(0);
    var submissionMark = 0;
    var assessmentMark = 0;
    var assessment = new AssObj(name, assessmentWeighting, submissionMark, assessmentMark);
    paper.assessments.push(assessment);
    return assessment;
}

function CreatePaper() {
    var name = TextQuestion('What class is this paper for? ');
    var numOfAssessments = NumberQuestion("How many assessments does this paper have in total. ");
    var validPaper = false;
    var paper = new CustomPaper(name);
    var maxPercentChecker = 0;
    paper.numOfAssessments = numOfAssessments;

    while (!validPaper) {
        for (var i = 0; i < numOfAssessments; i++) {
            var assessment = CreateBlankAssessment(paper);
            maxPercentChecker += parseInt(assessment.assessmentWeighting);
        }
        if (maxPercentChecker == 100) {
            console.log('Valid Weightings');
            validPaper = true;
        } else {
            console.log(`Your assessment weightings add up to ${maxPercentChecker} instead of 100.. Please try again`);
            validPaper = false;
            maxPercentChecker = 0;
            paper.assessments = [];
        }
    }
    AllPapers.push(paper);
    RunData();
    return paper;
}


/////////////////////////////////////////////////////////////////////////////

//took the test data function and made it generic. Now i can run both test data and custom data through it.
function RunPaperData(paper) {
    for (var i = 0; i < paper.assessments.length; i++) {
        paper.assessments[i] = MarkAssignment(paper.assessments[i]);
        paper.assessments[i].assessmentGrade = AssessmentGrader(paper.assessments[i]);
    }
    //Mark the paper to recieve the total mark
    paper.totalMark = MarkPaper(paper);
    //grade the paper to see what grade you currently have
    paper.subGrade = PaperGrader(paper);
    //see if you pass or not
    paper.pass = PassChecker(paper);
    //output to the user which paper scored what and how it changed your final grade
}


//TODO make sure all percentages have %
//TODO More comments