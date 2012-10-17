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
