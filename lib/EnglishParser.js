var EnglishParser = function () {};

function reduce(ary, acc, callback) {
  var len;

  for (i = 0, len = ary.length; i < len; i++) {
    acc = callback(acc, ary[i]);
  }

  return acc;
}

function select(ary, callback) {
  var newAry = [], i = 0, len = 0;

  for (i = 0, len = ary.length; i < len; i++) {
    if (callback(ary[i]))
      newAry.push(ary[i]);
  }

  return newAry;
}

EnglishParser.trim = function (str) {
  return str.replace(/^\s+|\s+$/, '');
};

/**
 * Each vowel in a word counts as one syllable subject to the following rules:
 *
 * - ignore the terminal -ES, -ED, -E (except for -LE)
 * - words of three letters or less count as one syllable
 * - consecutive vowels count as one syllable
 *
 * @see http://dl.acm.org/citation.cfm?id=10583
 * @see http://stackoverflow.com/a/520845/73492
 */
EnglishParser.prototype.getNumberSyllables = function (word) {
  var extra = 0, newWord;

  word = EnglishParser.trim(word).toLowerCase();

  if (word.length <= 3)
    return 1;

  newWord = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
  newWord = newWord.replace(/^y/, '')

  // maybe we chopped off the "e" in "races"
  if (newWord.length <= 3)
    extra += 1;

  return newWord.match(/[aeiouy]{1,2}/g).length + extra;
};

EnglishParser.prototype.getNumberSyllablesInText = function (text) {
  var words = this.getWords(text)
    , sylls = words.map(this.getNumberSyllables);

  return reduce(sylls, 0, function (sum, x) { return sum + x; });
};

EnglishParser.prototype.getWords = function (text) {
  var words = text ? text.split(/[^\w-]/) : [];

  return select(words, function (w) { return w !== ''; });
};

EnglishParser.prototype.getNumberWords = function (text) {
  return this.getWords(text).length;
};

EnglishParser.prototype.getSentences = function (text) {
  var sentences = text ? text.split(/[.!?]/) : [];

  return select(sentences.map(EnglishParser.trim), function (s) { return s !== ''; });
};

EnglishParser.prototype.getNumberSentences = function (text) {
  return this.getSentences(text).length;
};

/**
 * Implementation of Flesch-Kincaid grade level
 *
 * @see http://en.wikipedia.org/wiki/Flesch–Kincaid_readability_test
 */
EnglishParser.getGradeLevel = function (text) {
  var ep = new EnglishParser();
  var words = ep.getWords(text)
    , nWords = words.length
    , sentences = ep.getNumberSentences(text)
    , syll = ep.getNumberSyllablesInText(text);

  return 0.39 * (nWords/sentences) + 11.8 * (syll/nWords) - 15.59;
};
