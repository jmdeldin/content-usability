/*jslint browser: true*/
/*global buster: true, describe: true, it: true, before: true,
  gradeOptions: true, populateGradeSelect: true, getSelectedGrade: true,
  xrange: true, range: true, score2grade: true, unique: true*/

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

    describe('.getSelectedGrade', function () {
        it('returns a number', function () {
            var s = '<select id="grade_select">';
            s += '<option value="2">2nd</option>';
            s += '<option selected value="3">3rd</option>';
            s += '<option value="4">4th</option>';
            s += '</select>';
            document.querySelector('body').innerHTML = s;
            expect(getSelectedGrade('grade_select')).toEqual(3);
        });
    });

    describe('.score2grade', function () {
        function testGradeRange(start, stop, grade) {
            var r = range(start, stop, 1),
                g = r.map(function (x) { return score2grade(x); });
            g = unique(g);

            expect(g.length).toEqual(1);
            expect(g[0]).toEqual(grade);
        }

        it('converts scores to an grades', function () {
            testGradeRange(0, 59, 'F');
            testGradeRange(60, 69, 'D');
            testGradeRange(70, 79, 'C');
            testGradeRange(80, 89, 'B');
            testGradeRange(90, 100, 'A');
        });
    });
});
