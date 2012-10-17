/*global buster: true, describe: true, it: true, before: true,
  EnglishParser: true*/

"use strict";
var expect = buster.assertions.expect;

buster.spec.expose();

describe("EnglishParser", function () {
    before(function () {
        this.ep = new EnglishParser();
    });

    describe("#getWords", function () {
        before(function () {
            this.words = ["foo", "bar", "baz"];
        });

        it("splits words regardless of spaces", function () {
            expect(this.ep.getWords("foo   \tbar   baz  ")).toEqual(this.words);
        });

        it("does not count a hyphen twice", function () {
            expect(this.ep.getWords("foo-bar")).toEqual(["foo-bar"]);
        });
    });

    it("determines the number of words", function () {
        expect(this.ep.getNumberWords("foo bar baz")).toEqual(3);
    });

    describe("#getSentences", function () {
        before(function () {
            this.ary = ["Foo", "Bar"];
        });

        it("splits sentences ending in periods", function () {
            expect(this.ep.getSentences("Foo. Bar.")).toEqual(this.ary);
        });

        it("splits sentences ending in question marks", function () {
            expect(this.ep.getSentences("Foo? Bar?")).toEqual(this.ary);
        });

        it("splits sentences ending in exclamation points", function () {
            expect(this.ep.getSentences("Foo! Bar.")).toEqual(this.ary);
        });

        it("handles one sentence", function () {
            expect(this.ep.getSentences("Foo!")).toEqual(["Foo"]);
        });

        it("handles repeated punctuation marks", function () {
            expect(this.ep.getSentences("Foo!!?!?!?! Bar?!?!?")).toEqual(this.ary);
        });

        it("returns an empty array when given null", function () {
            expect(this.ep.getSentences(null)).toEqual([]);
        });

        it("returns an empty array when given an empty string", function () {
            expect(this.ep.getSentences("")).toEqual([]);
        });
    });

    it("determines the number of sentences", function () {
        var text = "See Spot run! See Spot play!";
        expect(this.ep.getNumberSentences(text)).toEqual(2);
    });

    describe("#getNumberSyllables", function () {
        before(function () {
            this.f = this.ep.getNumberSyllables;
        });

        it("counts one character as one syllable", function () {
            expect(this.ep.getNumberSyllables("a")).toEqual(1);
        });

        it("counts two characters as one syllable", function () {
            expect(this.ep.getNumberSyllables("ab")).toEqual(1);
        });

        it("counts three characters as one syllable", function () {
            expect(this.ep.getNumberSyllables("abc")).toEqual(1);
        });

        it("counts two syllables in 'ruby'", function () {
            expect(this.ep.getNumberSyllables("ruby")).toEqual(2);
        });

        it("counts two syllables in 'races'", function () {
            expect(this.ep.getNumberSyllables("races")).toEqual(2);
        });

        it("counts three syllables in 'discomfit'", function () {
            expect(this.ep.getNumberSyllables("discomfit")).toEqual(3);
        });

        it("counts two syllables in 'handle'", function () {
            expect(this.ep.getNumberSyllables("handle")).toEqual(2);
        });

        it("counts two syllables in 'themselves'", function () {
            expect(this.ep.getNumberSyllables("themselves")).toEqual(2);
        });

        it("handles hypens", function () {
            expect(this.ep.getNumberSyllables("Jon-Michael")).toEqual(3);
        });
    });

    describe("#getNumberSyllablesInText", function () {
        it("returns 3 for 3 simple words", function () {
            var r = this.ep.getNumberSyllablesInText("foo bar baz");
            expect(r).toEqual(3);
        });
    });

    describe(".getGradeLevel", function () {
        it("handles harder sentences", function () {
            var text = "The Australian platypus is seemingly a hybrid of a mammal "
                     + "and reptilian creature.";
            expect(EnglishParser.getGradeLevel(text)).toBeGreaterThan(11.0);
        });
    });

    describe(".getRoundedGradeLevel", function () {
        it("handles harder sentences", function () {
            var text = "The Australian platypus is seemingly a hybrid of a mammal "
                     + "and reptilian creature.";
            expect(EnglishParser.getRoundedGradeLevel(text)).toEqual(11);
        });
    });
});
