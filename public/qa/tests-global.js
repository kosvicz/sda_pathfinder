//const { assert } = require("chai")

suite('Global Tests', function(){
  test('In current page title is correct', function(){
    assert(document.title && document.title.match(/\S/) &&
            document.title.toUpperCase() !== 'TODU');
  });
});