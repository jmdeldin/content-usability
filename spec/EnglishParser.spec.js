var expect = buster.assertions.expect;

buster.spec.expose();

describe("EnglishParser", function () {
  before(function () {
    this.ep = new EnglishParser();
  });

  it("//determines the number of words", function () {
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
