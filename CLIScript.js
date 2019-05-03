var {
    question
} = require('readline-sync');

//global variables for grade comparision
var possibleGrades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "E"];
var gradePercentages = [90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 0];
//var for the Finite state machine in the CLI. True is on false is off. Should only be changed in the while loop
var BoolCLI = true;
//array to hold papers
var AllPapers = [];
//objects that hold the test data
var Assessments = [{
    "name": "Clicker Game", //name
    "assessmentWeighting": 20, //assessment weighting
    "submissionMark": 74, //submission mark
    "assessmentMark": 80, //assessment mark
    "submissionPercentage": 0, //submission percentage
    "assessmentGrade": ""
}, {
    "name": "Grader",
    "assessmentWeighting": 30,
    "submissionMark": 60,
    "assessmentMark": 80,
    "submissionPercentage": 0,
    "assessmentGrade": ""
}, {
    "name": "Movie Database",
    "assessmentWeighting": 50,
    "submissionMark": 68,
    "assessmentMark": 100,
    "submissionPercentage": 0,
    "assessmentGrade": ""
}];
var IntroToProgramming = {
    "name": "ITPF5.110", //class the paper is in
    "assessments": Assessments, //holds all the assessments for the paper
    "totalMark": 0, //holds the total mark you have so far
    "subGrade": "", //This shows your current grade
    "numOfAssessments": 3, // to make the test data consistant with the created papers
    "pass": false //boolean that shows if you've passed the paper yet or not
}
//custom object. works easier than using a tonne of arrays for holding information
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
function SubmissionPercentage(assessmentWeighting, submissionMark, maxMark) {
    return `${(assessmentWeighting * submissionMark / maxMark).toFixed(2)}%`;
}
//this puts the assignment percentage in the assignment object for safe keeping
function MarkAssignment(assignment) {
    assignment.submissionPercentage = SubmissionPercentage(assignment.assessmentWeighting, assignment.submissionMark, assignment.assessmentMark);
    return assignment;
}
//this function takes all the assessments and totals their points towards paper completion
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
//This function grades individual assessments
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
    //cool bit of code. short hand for : if true ? if false
    return paper.totalMark > 50 ? "pass" : "fail";
}
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
//put all my data validation into a couple of question asking functions
function NumberQuestion(questionString) {
    var questionBool = true; //for the while loop
    while (questionBool) {
        //ask the user a question
        var myQuestion = question(questionString);
        var newQuestion = 0;
        for (var i = 0; i < myQuestion.length; i++) {
            //better validation. dig through the string and pull out all the numbers. concat them and then parse them
            if (!isNaN(myQuestion[i])) {
                newQuestion += myQuestion[i];
            }
        }
        //parse the new hopefully char-less string
        newQuestion = parseInt(newQuestion);
        //if its a number return it. else deny the user and make them try again
        if (!isNaN(newQuestion)) {
            return newQuestion;
        } else {
            console.log("Answer is not a number. Please try again.")
        }
    }
}
//text version of the questioner with built in isNan validation
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
//combo questioner. this one checks for numbers or the character n. is used to cancel show data
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
////////////////////////////////////////////////////////////////////////////
//for some reason i put my start code here and then built around it.
//for navigation purposes everything above me should be math and utils stuff
//everything below me should be making this monster run

//push test data into array
AllPapers.push(IntroToProgramming);
//state machine while loop
while (BoolCLI) {
    console.clear(); //clears the console every loop
    console.log("Options: (C)reatepaper | (E)ditData | (H)elp | (R)unMarking | (S)howData | (Q)uit");
    var input = TextQuestion('');
    switch (input.toLowerCase()) {
        case "createpaper":
        case "c":
            {
                //paper creation state. makes and displays the papers
                CreatePaper();
                console.clear();
                console.table(AllPapers);
                break;
            }
        case "runmarking":
        case "r":
            {
                //runs the marking algorythms on all papers
                console.clear();
                RunData();
                break;
            }

        case "editdata":
        case "e":
            console.clear();
            //allows the user to edit the data
            EdittingData();

            break;
        case "showdata":
        case "s":
            {
                //displays the data
                console.clear();
                ShowData();
                break
            };
        case "help":
        case "h":
            {
                console.log(`To see the test data, use the run marking command and then show data.`);
                console.log(`Create and edit will allow you to make new assignments and fill them with data`);
                console.log(`If you have any troubles or questions let me know on discord`);
                question("Press any key to continue");
                break;
            }
        case "quit":
        case "q":
            //quits the application
            console.clear();
            Quit();
            break;
        default:
            //default because this is important for switch statements
            console.log("Invalid Option. Please try again");
    }
}


/////////////////////////////////////////////////////////////////////////////
//MAIN() RUNNING FUNCTIONS FROM HERE
////////////////////////////////////////////////////////////////////////////
//turns off the statemachine by triggering the bool to false
function Quit() {
    console.log("Program stopping");
    BoolCLI = false;
}
//select a paper to edit. edit the paper and then calculate the papers new target percentage
function EdittingData() {
    var paper = SelectPaper();
    console.clear();
    var continueEditing = true;
    while (continueEditing) {
        var assessment = SelectAssessment(paper);
        EditData(assessment, paper);
        paper.targetPercentage -= parseInt(assessment.submissionPercentage);
        //stops the target % going under 0
        if (paper.targetPercentage < 0) {
            paper.targetPercentage = 0;
        }
        var continueEditingString = TextQuestion(`Would you like to select another? y | n:`);
        continueEditing = (continueEditingString.toLowerCase() == "y" || continueEditingString.toLowerCase() == "yes");
    }
}
//asks all the questions for editing data
function EditData(assessment, paper) {
    console.clear();
    console.table(assessment);
    assessment.name = TextQuestion('What is the name of this assessment? :');
    var validMarks = false;
    while (!validMarks) {
        assessment.submissionMark = NumberQuestion('What mark did you get? :');
        assessment.assessmentMark = NumberQuestion('How many marks were available? :');
        //makes sure you cant have a higher mark than there are marks 
        if (assessment.submissionMark <= assessment.assessmentMark) {
            validMarks = true;
        } else {
            console.log("Invalid Mark Input. Please ensure you entered marks are less than the maximum for the assessment");
        }
    }
    //reruns marking
    RunData();
    console.clear();
    console.table(paper.assessments);
}
//loops through all the papers and runs the marking
function RunData() {
    if (AllPapers.length != 0) {
        for (var i = 0; i < AllPapers.length; i++) {
            RunPaperData(AllPapers[i]);
        }
    };
}
//displays all the papers as tables
function ShowData() {
    if (AllPapers.length == 0) {
        AllPapers.push(IntroToProgramming);
    }
    console.clear();
    console.table(AllPapers);
    var wouldYouLikeToSeeMore = true;
    while (wouldYouLikeToSeeMore) {
        var selector = NumberOrNoQuestion("What is the index of the paper you wanted to see? or n to cancel: ");
        if (selector.toLowerCase == 'n') {
            break;
        } else if (selector > AllPapers.length) {
            console.log("This number is higher than the number of papers. Please try again");
        } else {
            if (!isNaN(selector)) {
                console.clear();
                console.table(AllPapers[selector].assessments);
                var wouldYouLikeToSeeMoreString = TextQuestion(`Would you like to select another? :`);
                wouldYouLikeToSeeMore = (wouldYouLikeToSeeMoreString.toLowerCase() == "y" || wouldYouLikeToSeeMoreString.toLowerCase() == "yes");
            } else {
                break;
            }
        }
    }


}
//used to select which paper you want to edit or see
function SelectPaper() {
    console.table(AllPapers);
    console.log(`There are currently ${AllPapers.length} papers to choose from`);
    var paperSelector = NumberQuestion("Which paper did you want to input marks to? (Index) :");
    return AllPapers[paperSelector];
}
//used to select which paper you want to edit or see
function SelectAssessment(paper) {
    console.table(paper.assessments);
    console.log(`There are currently ${paper.assessments.length} assessments to choose from`);
    var assessSelector = NumberQuestion("Which assessment did you want to input marks to? (Index) :");
    return paper.assessments[assessSelector];
}
//creates a blank assessment. used for making sure weightings add up too 100%
function CreateBlankAssessment(paper) {
    var name = `assessment${paper.assessments.length}`
    var assessmentWeighting = NumberQuestion(`What is the weighting of assessment ${paper.assessments.length+1}? `).toFixed(0);
    var submissionMark = 0;
    var assessmentMark = 0;
    var assessment = new AssObj(name, assessmentWeighting, submissionMark, assessmentMark);
    paper.assessments.push(assessment);
    return assessment;
}
//creates a new paper to hold our assessments. this means the user can input marks for multiple assessments
function CreatePaper() {
    var name = TextQuestion('What class is this paper for? ');
    //asks how many assessments there are so we know how many times to loop
    var numOfAssessments = NumberQuestion("How many assessments does this paper have in total. ");
    var validPaper = false;
    var paper = new CustomPaper(name);
    var maxPercentChecker = 0;
    paper.numOfAssessments = numOfAssessments;

    while (!validPaper) {
        //loop for how many assessments there are. this is in a while loop so that 
        //we can check for valid input before confirming it
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
//Notes
//The way i layed this out with tables made the formatting and extra tasks a little bit harder than they needed to be
//I took a crack at the html stuff but i couldn't decide how i wanted to lay it out and make it work. I'll probably include
//it as a seperate file.
//I think over half my variables are displaying correctly with % and two decimals but once again objects and tables made 
//that way harder than it should have been. 