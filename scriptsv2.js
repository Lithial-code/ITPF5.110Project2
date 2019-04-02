var possibleGrades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "E"];
var gradePercentages = [90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 0];

var Assignment1 = {
    "name": "Clicker Game",
    "weighting": 20,
    "mark": 74,
    "totalmarksavailable": 80,
    "marksForThis":0
}
var Assignment2 = {
    "name": "Grader",
    "weighting": 30,
    "mark": 60,
    "totalmarksavailable": 80,
    "marksForThis":0
}
var Assignment3 = {
    "name": "Movie Database",
    "weighting": 50,
    "mark": 68,
    "totalmarksavailable": 100,
    "marksForThis":0
}
var IntroToProgramming = {
    "class": "ITPF5.110",
    "assignments": [Assignment1,Assignment2,Assignment3],
    "totalMark":0,
    "grade":"",
    "pass": false
}
function AssignmentPercentage(weighting, mark, maxMark) {
    return weighting * mark / maxMark;
}
function MarkAssignment(assignment){
    assignment.marksForThis = AssignmentPercentage(assignment.weighting, assignment.mark, assignment.totalmarksavailable);
    return assignment;
}
function MarkPaper(paper){
    var totalMark = 0.0;
    for(var i = 0; i < paper.assignments.length; i++){
        totalMark +=paper.assignments[i].marksForThis;
    }
    return totalMark;
}
function GradePaper(paper){
    for (var i = 0; i < possibleGrades.length; i++) {
        if (paper.totalMark > gradePercentages[i]) {
            return possibleGrades[i];
        }
    }
}
function PassChecker(paper) {
    return paper.totalMark > 50?"pass":"fail";
}



for(var i = 0; i < IntroToProgramming.assignments.length; i++)
{
    IntroToProgramming.assignments[i] = MarkAssignment(IntroToProgramming.assignments[i]);  
}
IntroToProgramming.totalMark = MarkPaper(IntroToProgramming);
IntroToProgramming.grade = GradePaper(IntroToProgramming);
IntroToProgramming.pass = PassChecker(IntroToProgramming);
for(var i = 0; i < IntroToProgramming.assignments.length; i++)
{
    var assignment = IntroToProgramming.assignments[i];
    console.log(`For ${assignment.name} You scored ${assignment.mark}/${assignment.totalmarksavailable} adding ${assignment.marksForThis}% to your paper score`);
}
console.log(`For ${IntroToProgramming.class} you scored ${IntroToProgramming.totalMark}% and you ${IntroToProgramming.pass} with a ${IntroToProgramming.gra}`);
