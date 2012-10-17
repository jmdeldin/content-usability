/*jslint browser: true*/
/*globals chrome: true, gradeInterpreter: true, ordinalize: true,
  average: true, gradeOptions: true, score2grade: true,
  getSelectedGrade: true, populateGradeSelect: true, toggle: true*/

"use strict";

/**
 * This file is loaded by the browser action (toolbar icon).
 *
 * @author Jon-Michael Deldin <dev@jmdeldin.com>
 */

if (chrome.extension !== undefined) {
    var formNode = document.querySelector('form'),
        resultsNode = document.getElementById('results');

    populateGradeSelect('grade_level');
    toggle(resultsNode);

    chrome.extension.onMessage.addListener(function (results) {
        toggle(formNode);
        toggle(resultsNode);
        var resultSection = document.getElementById('results'),
            gr = gradeInterpreter(getSelectedGrade('grade_level'), results.grade_level).interpret(),
            scores = [],
            overall,
            grade;

        document.getElementById('readability_gl_msg').innerHTML = gr[0];
        document.getElementById('readability_gl').innerHTML = ordinalize(results.grade_level);
        document.getElementById('readability_score').innerHTML = gr[1];

        scores.push(gr[1]);

        updateOverallGradeAndScore(scores);
    });

    document.getElementById('submit').addEventListener('click', function (e) {
        // browser action popups aren't part of tabs -- that is why getSelected is used
        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.executeScript(tab.id, {file: 'lib/helpers.js'}); // to include
            chrome.tabs.executeScript(tab.id, {file: 'lib/EnglishParser.js'}); // to include
            chrome.tabs.executeScript(tab.id, {file: 'lib/evaluate.js'}); // to do work
        });
    });

    document.getElementById('redo').addEventListener('click', function (e) {
        toggle(formNode);
        toggle(resultsNode);
    });

}
