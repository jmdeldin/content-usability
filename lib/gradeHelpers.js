/*jslint browser: true */
/*global ordinalize: true*/

"use strict";

/**
 * Construct a list of `OPTION` elements for grades 1-12.
 *
 * @return {Array}
 */
function gradeOptions() {
    var i = 0, options = [], tmp;

    for (i = 1; i < 13; i += 1) {
        tmp = '<option value="' + i + '">' + ordinalize(i) + '</option>';
        options.push(tmp);
    }

    return options;
}

/**
 * Replaces a `SELECT` element's contents with `gradeOptions()`.
 *
 * @param {String} id HTML ID of a SELECT element
 * @return {Boolean}
 */
function populateGradeSelect(id) {
    var sel = document.getElementById(id);
    if (!sel) { return false; }

    sel.innerHTML = gradeOptions();

    return true;
}

/**
 * Returns the grade selected by the user.
 *
 * @param {String} id HTML ID of a SELECT element
 * @return {Number}
 */
function getSelectedGrade(selectId) {
    var sel = document.getElementById(selectId);
    if (!sel) { return 0; }

    return Number(sel.value);
}

/**
 * Convert a numeric score to a letter grade.
 *
 * @param {Number}
 * @return {String}
 */
function score2grade(score) {
    var grade = 'A';
    if (score < 60) {
        grade = 'F';
    } else if (score < 70) {
        grade = 'D';
    } else if (score < 80) {
        grade = 'C';
    } else if (score < 90) {
        grade = 'B';
    }
    return grade;
}
