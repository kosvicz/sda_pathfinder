//const { assert } = require("chai")

suite('Tests about page', function(){
  test('Page should contain a link to contacts page', function(){
    assert($('a[href="/contacts"]').length);
  });
});