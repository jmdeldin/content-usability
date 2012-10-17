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
