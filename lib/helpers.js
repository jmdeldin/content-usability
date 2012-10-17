"use strict";

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
 * Return the singular or plural form of a string depending on a count.
 *
 * @param {Number} count
 * @param {String} singular
 * @param {String} plural
 * @return {String}
 */
function pluralize(count, singular, plural) {
    return count === 1 ? singular : plural;
}

/**
 * Accumulate the results of an operation over an array.
 *
 * @param {Array} ary
 * @param {Object} acc Accumulator
 * @param {Function} callback
 * @return {Object}
 */
function reduce(ary, acc, callback) {
    var i, len;

    for (i = 0, len = ary.length; i < len; i += 1) {
        acc = callback(acc, ary[i]);
    }

    return acc;
}

/**
 * Sum an array
 *
 * @param {Array}
 * @return {Number}
 */
function sum(ary) {
    return reduce(ary, 0, function (sum, x) { return sum + x; });
}

/**
 * Averages an array
 *
 * @param {Array}
 * @return {Number}
 */
function average(ary) {
    return sum(ary) / ary.length;
}

/**
 * Returns elements matching a condition in an array.
 *
 * @param {Array} ary
 * @param {Function} callback A callback that takes a single argument
 * @return {Array}
 */
function select(ary, callback) {
    var newAry = [], i = 0, len = 0;

    for (i = 0, len = ary.length; i < len; i += 1) {
        if (callback(ary[i])) {
            newAry.push(ary[i]);
        }
    }

    return newAry;
}

/**
 * Remove leading and trailing whitespace from a string.
 *
 * @param {String} str
 * @return {String}
 */
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

/**
 * Returns an inclusive range from low to high.
 *
 * @param {Number} low
 * @param {Number} high
 * @param {Number} step
 * @return {Array}
 */
function range(low, high, step) {
    var ary = [];
    while (low <= high) {
        ary.push(low);
        low += step;
    }
    return ary;
}

/**
 * Returns an exclusive range.
 */
function xrange(low, high, step) {
    return range(low, high - step, step);
}

/**
 * Removes duplicate values.
 *
 * @param {Array} ary
 * @return {Array}
 */
function unique(ary) {
    var newAry = [], h = {}, i, c, len = ary.length;

    for (i = 0; i < len; i += 1) {
        c = ary[i];
        if (!h[c]) {
            h[c] = true;
            newAry.push(c);
        }
    }

    return newAry;
}
