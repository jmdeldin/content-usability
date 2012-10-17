/*jslint browser: true*/
/*globals chrome: true */


/**
 * This file is loaded by the browser action (toolbar icon).
 *
 * @author Jon-Michael Deldin <dev@jmdeldin.com>
 */

"use strict";

function reduce(ary, acc, callback) {
    var i, len;

    for (i = 0, len = ary.length; i < len; i += 1) {
        acc = callback(acc, ary[i]);
    }

    return acc;
}

/**
 * Return the "st", "nd", and "th" suffix of an integer.
 *
 * Adapted from Ruby on Rails ordinalize method.
 *
 * @see http://api.rubyonrails.org/classes/ActiveSupport/Inflector.html#method-i-ordinalize
 * @param {Number} n
 * @return {String}
 */
function ordinalize(n) {
    var map = {
        1: 'st',
        2: 'nd',
        3: 'rd'
    };

    if (n === 11 || n === 12 || n === 13) {
        return n + 'th';
    }

    return n + map[n % 10] || n + 'th';
}

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

/**
 * Represents a result to be rendered in the GUI pane.
 *
 * @param {String} paentNode
 * @param {String} htmlId
 */
var Result = function (parentNode, htmlId) {
    this.parentNode = parentNode;
    this.htmlId = htmlId;
};

/**
 * Returns a string interpretation of the results.
 *
 * NOTE: Children must implement this abstract function.
 *
 * @return {String}
 */
Result.prototype.interpret = function () {
    throw new Error("interpret not implemented");
};

/**
 * Returns the existing DOM node of the result section.
 * @return {Object}
 */
Result.prototype.getNode = function () {
    return document.getElementById(this.htmlId);
};

/**
 * Replaces the HTML node's content (if available) with the new results.
 */
Result.prototype.render = function () {
    var n = this.getNode();

    if (!n) {
        n = document.createElement('section');
        n.id = this.htmlId;
        this.parentNode.appendChild(n);
    }
    n.innerHTML = this.interpreted;
};

var GradeResult = function (parentNode, htmlId) {
    this.parentNode = parentNode;
};
GradeResult.prototype = new Result();
GradeResult.prototype.constructor = GradeResult;
GradeResult.prototype.interpret = function (userEstimate, ourEstimate) {
    var msg, score = 100;

    if (ourEstimate > 8) {
        msg  = "Oh no! Consider editing your content for a lower grade level.";
        score -= (ourEstimate - 8) * 10;
    } else {
        msg = "This is great!";
    }

    this.interpreted = msg;
    this.score = score;
};

if (chrome.extension !== undefined) {
    chrome.extension.onMessage.addListener(function (results) {
        document.querySelector('form').style.display = 'none';
        document.querySelector('#results').style.display = '';
        var resultSection = document.getElementById('results'),
            r = new GradeResult(resultSection, 'grade_result'),
            scores = [],
            overall,
            grade;
        r.interpret(getSelectedGrade('grade_level'), results.grade_level);

        document.getElementById('readability_gl_msg').innerHTML = r.interpreted;
        document.getElementById('readability_gl').innerHTML = ordinalize(results.grade_level);
        document.getElementById('readability_score').innerHTML = r.score;

        scores.push(r.score);

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
