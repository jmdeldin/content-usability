/*jslint browser: true*/
/*global average: true, score2grade: true*/

"use strict";

function updateOverallGradeAndScore(scores) {
    var overall = average(scores).toFixed(1),
        grade = score2grade(overall);

    document.getElementById('overall_score').innerHTML = overall + '%';
    document.getElementById('overall_grade').innerHTML = grade;
}
