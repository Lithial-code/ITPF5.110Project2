//test variables
var paperWeighting = [20,30,50];
var paperMarks = [74,60,68];
var paperMax = [80,80,100];
//math for the percentage of your paper this assignment is worth
function mathAssignmentPercentage(weighting,mark,maxMark)
{
    return weighting * mark / maxMark;
}
//for ever assignment do the math and add all the totals to an array for later totalling
function mathPaperTotal()
{
    var total = [];
    for(var i =0; i < paperWeighting.length; i++){
       total.push(mathAssignmentPercentage(paperWeighting[i],paperMarks[i], paperMax[i]));
    }
    return total;
}
//take an array and add all the values together returning the total
function mathArrayToNumber(list)
{
    var total = 0.0;
    for(var i =0; i < list.length; i++){
       
        total += list[i];
    }
    return total;
}
//console for testing
console.log(mathArray(mathPaperTotal()));