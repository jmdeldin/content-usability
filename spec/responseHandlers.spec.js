/*jslint browser: true*/
/*global buster: true, describe: true, it: true, before: true,
  updateOverallGradeAndScore: true*/

"use strict";
var expect = buster.assertions.expect;

buster.spec.expose();

describe('response helpers', function () {
    describe('.updateOverallGradeAndScore', function () {
        before(function () {
            var b = document.querySelector('body'),
                os = document.createElement('div'),
                og = document.createElement('div');
            os.id = 'overall_score';
            og.id = 'overall_grade';
            b.appendChild(os);
            b.appendChild(og);
        });

        it('updates the score', function () {
            updateOverallGradeAndScore([80, 100]);
            expect(document.querySelector('#overall_score').innerHTML).
                toEqual('90.0%');
        });

        it('updates the score', function () {
            updateOverallGradeAndScore([70, 90]);
            expect(document.querySelector('#overall_grade').innerHTML).
                toEqual('B');
        });
    });
});
