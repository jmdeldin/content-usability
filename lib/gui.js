/*jslint browser: true*/
/*globals chrome: true, populateGradeSelect: true, toggle: true,
  updateOverallGradeAndScore: true, updateReadability: true*/

"use strict";

/**
 * This file is loaded by the browser action (toolbar icon).
 *
 * @author Jon-Michael Deldin <dev@jmdeldin.com>
 */

var FORM_NODE = document.querySelector('form'),
    RESULTS_NODE = document.getElementById('results');

/**
 * Injects the necessary JS files on the selected tab for evaluate.js to run.
 *
 * Browser action popups aren't part of tabs, so we use getSelected to
 * determine the tab ID.
 */
function injectTabScripts() {
    var scripts = ['helpers', 'EnglishParser', 'evaluate'], i, fn;

    chrome.tabs.getSelected(null, function (tab) {
        for (i = 0; i < scripts.length; i += 1) {
            var fn = 'lib/' + scripts[i] + '.js';
            chrome.tabs.executeScript(tab.id, {file: fn});
        }
    });
}

/**
 * Reset the interface on re-do.
 */
function toggleInterface() {
    toggle(FORM_NODE);
    toggle(RESULTS_NODE);
}

/**
 * Handle the result object from the evaluation script.
 *
 * @param {Object} results
 */
function handleEvaluationResponse(results) {
    var scores = [updateReadability(results.grade_level)];
    toggleInterface();
    updateOverallGradeAndScore(scores);
}


if (chrome.extension !== undefined) {
    populateGradeSelect('grade_level');
    toggle(RESULTS_NODE);

    document.getElementById('submit').addEventListener('click', injectTabScripts);
    document.getElementById('redo').addEventListener('click', toggleInterface);

    chrome.extension.onMessage.addListener(handleEvaluationResponse);
}
