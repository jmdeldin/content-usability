var EnglishParser = function () {};

function select(ary, callback) {
  var newAry = [], i = 0, len = 0;

  for (i = 0, len = ary.length; i < len; i++) {
    if (callback(ary[i]))
      newAry.push(ary[i]);
  }

  return newAry;
}

EnglishParser.prototype.trim = function (str) {
  return str.replace(/^\s+|\s+$/, '');
};

EnglishParser.prototype.getWords = function (text) {
  var words = text ? text.split(/\s+/) : [];

  return select(words, function (w) { return w !== ''; });
};

EnglishParser.prototype.getNumberWords = function (text) {
  return this.getWords(text).length;
};

EnglishParser.prototype.getSentences = function (text) {
  var sentences = text ? text.split(/[.!?]/) : [];

  return select(sentences.map(this.trim), function (s) { return s !== ''; });
};

EnglishParser.prototype.getNumSentences = function (text) {
  return this.getSentences(text).length;
};
