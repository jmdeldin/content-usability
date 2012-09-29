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
    expect(this.ep.getNumSentences(text)).toEqual(2);
  });

  it("//determines the number of syllables", function () {
  });
});
