/*jslint browser: true*/
/*globals chrome: true, gradeInterpreter: true */


/**
 * This file is loaded by the browser action (toolbar icon).
 *
 * @author Jon-Michael Deldin <dev@jmdeldin.com>
 */

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
 * Replaces a `SELECT` elements contents with `gradeOptions()`.
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

if (chrome.extension !== undefined) {
    chrome.extension.onMessage.addListener(function (results) {
        document.querySelector('form').style.display = 'none';
        document.querySelector('#results').style.display = '';
        var resultSection = document.getElementById('results'),
            // r = new GradeResult(resultSection, 'grade_result'),
            gr = gradeInterpreter(getSelectedGrade('grade_level'), results.grade_level).interpret(),
            scores = [],
            overall,
            grade;
        // r.interpret(getSelectedGrade('grade_level'), results.grade_level);

        document.getElementById('readability_gl_msg').innerHTML = gr[0];
        document.getElementById('readability_gl').innerHTML = ordinalize(results.grade_level);
        document.getElementById('readability_score').innerHTML = gr[1];

        scores.push(gr[1]);

        // sum
        overall = reduce(scores, 0, function (sum, x) { return sum + x; }) / scores.length;
        overall = overall.toFixed(1);
        document.getElementById('overall_score').innerHTML = overall + '%';
        var scoreReport = {
            'A': 'We found your content to be very usable.',
            'B': 'Your content was pretty usable, but you have some room for improvement.',
            'C': 'Your content has some usability issues.',
            'D': 'Your content has severe usability issues.',
            'F': 'Your content is extremely unusable.'
        };
        if (overall < 60) {
            grade = 'F';
        } else if (overall < 70) {
            grade = 'D';
        } else if (overall < 80) {
            grade = 'C';
        } else if (overall < 90) {
            grade = 'B';
        } else {
            grade = 'A';
        }
        document.getElementById('overall_grade').innerHTML = grade;
        document.querySelector('#overall_msg span').innerHTML = scoreReport[grade];
    });

    document.getElementById('submit').addEventListener('click', function (e) {
        // browser action popups aren't part of tabs -- that is why getSelected is used
        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.executeScript(tab.id, {file: 'lib/EnglishParser.js'}); // to include
            chrome.tabs.executeScript(tab.id, {file: 'lib/evaluate.js'}); // to do work
        });
    });

    document.getElementById('redo').addEventListener('click', function (e) {
        document.querySelector('form').style.display = '';
        document.querySelector('#results').style.display = 'none';
    });

    populateGradeSelect('grade_level');
    document.querySelector('#results').style.display = 'none';
}
