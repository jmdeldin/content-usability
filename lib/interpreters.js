/*jslint browser: true*/
/*global pluralize: true*/

"use strict";

//
// Interpret various metrics into a string response and a score.
//

// Abstract "class" for interpreting results. This is in an implementation of
// functional inheritance, as defined in /JavaScript: The Good Parts/.
//
// In this pattern, we define a constructor (`interpreter`) that returns an
// object literal.
var interpreter = function () {
    var that = {};

    // Return array, [message, score]
    that.interpret = function () {
        throw new Error("interpret not implemented");
    };

    return that;
};

// Interpret the reading level given the `userEstimate` and `ourEstimate`
var gradeInterpreter = function (userEstimate, ourEstimate) {
    var that = interpreter(),
        msg = '',
        score = 100,
        IDEAL_LEVEL = 8,
        diff = ourEstimate - userEstimate,
        trans;

    that.interpret = function () {
        if (ourEstimate > IDEAL_LEVEL) {
            msg = "Oh no! Consider writing for a lower grade level.";
            score -= (ourEstimate - IDEAL_LEVEL) * 10;
        } else {
            msg = "This is great!";
        }

        // if they underestimated
        if (diff > 0) {
            trans = score < 100 ? ' Additionally' : ' However';
            msg += trans + ", you underestimated by " + diff + " grade ";
            msg += pluralize(diff, "level", "levels") + ".";
            score -= diff * 10;
        }

        score = score < 0 ? 0 : score;

        return [msg, score];
    };

    return that;
};
