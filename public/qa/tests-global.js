//const { assert } = require("chai")

suite('Global Tests', () => {
  test('In current page title is correct', () => {
    assert(document.title && document.title.match(/\S/) &&
            document.title.toUpperCase() !== 'TODU');
  });
});