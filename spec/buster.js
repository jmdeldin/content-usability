/*global module: true */
var config = module.exports;

config.specs = {
    rootPath: "../",
    environment: "browser",
    sources: [
        // lib/helpers.js needs to be loaded first
        "lib/helpers.js",
        "lib/EnglishParser.js",
        "lib/interpreters.js"
    ],
    specs: [
        "spec/*.spec.js"
    ]
};
