/**
 * Evaluate each page. This is injected on each page after clicking the
 * "Evaluate" button. The results are then sent back to the browser action
 * (aka GUI).
 */

// TODO: We need a more sophisticated method of selecting text nodes and a few
// heuristics to ignore non-sentence text like menu items, captions, data
// tables, etc.
var text = document.querySelector('body').textContent;

var results = {
    grade_level: EnglishParser.getRoundedGradeLevel(text)
};

if (chrome.extension !== undefined)
    chrome.extension.sendMessage(results);
