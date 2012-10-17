/*jslint browser: true*/
/*global average: true, score2grade: true, getSelectedGrade: true,
  ordinalize: true, gradeInterpreter: true*/

"use strict";

function updateOverallGradeAndScore(scores) {
    var overall = average(scores).toFixed(1),
        grade = score2grade(overall);

    document.getElementById('overall_score').innerHTML = overall + '%';
    document.getElementById('overall_grade').innerHTML = grade;
}

/**
 * Update the readability score.
 *
 * @return {Number} score
 */
function updateReadability(gradeLevel) {
    var sel = getSelectedGrade('grade_level'),
        results = gradeInterpreter(sel, gradeLevel).interpret(),
        level = ordinalize(gradeLevel);

    document.getElementById('readability_gl_msg').innerHTML = results[0];
    document.getElementById('readability_gl').innerHTML = level;
    document.getElementById('readability_score').innerHTML = results[1];

    return results[1];
}
