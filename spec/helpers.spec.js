/*global buster: true, describe: true, it: true, before: true*/
/*global ordinalize: true, pluralize: true*/

"use strict";
var expect = buster.assertions.expect;

buster.spec.expose();

describe('helpers', function () {
    describe('ordinalize', function () {
        before(function () {
            this.f = ordinalize;
        });

        it("converts 1 to 1st", function () {
            expect(this.f(1)).toEqual("1st");
        });

        it("converts 11 to 11th", function () {
            expect(this.f(11)).toEqual("11th");
        });

        it("converts 2 to 2nd", function () {
            expect(this.f(2)).toEqual("2nd");
        });

        it("converts 222 to 222nd", function () {
            expect(this.f(222)).toEqual("222nd");
        });

        it("converts 3 to 3rd", function () {
            expect(this.f(3)).toEqual("3rd");
        });

        it("converts 23 to 23rd", function () {
            expect(this.f(23)).toEqual("23rd");
        });
    });


    describe('pluralize', function () {
        before(function () {
            this.f = pluralize;
        });

        it("adds an s to two items", function () {
            expect(pluralize(2, "level", "levels")).toEqual("levels");
        });

        it("does not add an s to one item", function () {
            expect(pluralize(1, "level", "levels")).toEqual("level");
        });

        it("adds an s to no items", function () {
            expect(pluralize(0, "level", "levels")).toEqual("levels");
        });
    });
});