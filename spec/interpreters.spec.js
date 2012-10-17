/*global buster: true, describe: true, it: true, before: true*/
/*global gradeInterpreter: true*/

"use strict";
var expect = buster.assertions.expect;

buster.spec.expose();

describe('gradeInterpreter', function () {
    before(function () {
        this.f = gradeInterpreter;
    });

    it("penalizes content over an eighth grade level", function () {
        var r = this.f(12.0, 12.0).interpret();
        expect(r[0]).toMatch(/Oh no!/);
        expect(r[1]).toEqual(60);
    });

    it("returns a 100% score for eighth grade content", function () {
        var r = this.f(8.0, 8.0).interpret();
        expect(r[0]).toMatch(/This is great!/);
        expect(r[1]).toEqual(100);
    });

    it("penalizes content if the user understimates by two levels", function () {
        var r = this.f(3.0, 5.0).interpret();
        expect(r[0]).toMatch(/However, you underestimated by 2 grade levels/);
        expect(r[1]).toEqual(80);
    });

    it("penalizes content if the user understimates by one grade", function () {
        var r = this.f(4.0, 5.0).interpret();
        expect(r[0]).toMatch(/However, you underestimated by 1 grade level\./);
        expect(r[1]).toEqual(90);
    });

    it("penalizes content a maximum of 100 points", function () {
        var r = this.f(1.0, 12.0).interpret();
        expect(r[1]).toEqual(0);
    });
});
