//const { assert } = require("chai")

suite('Tests about page', () => {
  test('Page should contain a link to contacts page', () => {
    assert($('a[href="/contacts"]').length);
  });
});