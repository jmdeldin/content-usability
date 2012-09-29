var EnglishParser = function () {};

EnglishParser.prototype.trim = function (str) {
  return str.replace(/^\s+|\s+$/, '');
};

EnglishParser.prototype.getSentences = function (text) {
  var i = 0
    , len = 0
    , s = ''
    , newSentences = []
    , sentences;

  if (!text)
    return newSentences;

  sentences = text.split(/[.!?]/)

  for (i = 0, len = sentences.length; i < len; i++) {
    s = this.trim(sentences[i]);
    if (s !== '')
      newSentences.push(s);
  }

  return newSentences;
};

EnglishParser.prototype.getNumSentences = function (text) {
  return this.getSentences(text).length;
};
