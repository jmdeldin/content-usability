# Content Usability Toolkit

This is a Google Chrome extension to evaluate content based relevance,
readability, legibility, and navigability. It is a portion of my master's
project and is under heavy development.

## Requirements

1. Node (`brew install node`)
2. Buster (`npm install -g buster`)
3. Ruby 1.9.2+

## Testing

1. `rake spec:server`
3. `rake spec:auto`

## Running

1. Install
[Extensions Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid)
in Chrome.
2. On `chrome://extensions`, select "Load unpacked extension"
3. Select the project's root directory
4. Visit a web page and select the magnifying glass

## Author

Jon-Michael Deldin (dev@jmdeldin.com)
