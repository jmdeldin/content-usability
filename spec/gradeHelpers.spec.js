/*jslint browser: true*/
/*global buster: true, describe: true, it: true, before: true,
  gradeOptions: true, populateGradeSelect: true*/

"use strict";
var expect = buster.assertions.expect;

buster.spec.expose();

describe('grade helpers', function () {
    describe('.gradeOptions', function () {
        it('returns a list of OPTION HTML', function () {
            var opts = gradeOptions();
            expect(opts.length).toEqual(12);
            expect(opts[1]).toEqual('<option value="2">2nd</option>');
        });
    });

    describe('.populateGradeSelect', function () {
        before(function () {
            var b = document.querySelector('body');
            b.innerHTML = '<select id="grade_select"></select>';
        });

        it('inserts OPTION elements into the select', function () {
            var opts;
            populateGradeSelect('grade_select');
            opts = document.querySelectorAll('#grade_select option');
            expect(opts.length).toEqual(12);
        });
    });
});
