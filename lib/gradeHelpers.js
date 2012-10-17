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
