/*global buster: true, describe: true, it: true, before: true,
  gradeOptions: true*/

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
});
