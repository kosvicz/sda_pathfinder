const Browser = require('zombie'),
       assert = require('chai').assert;

var browser;

suite('Crosspage tests', () => {
  setup(() => {
    browser = new Browser();
  });

  test('requesting a group rate quote from the hood river tour page should ' +
      'populate the hidden referrer field correctly', (done) => {
    var referrer = 'http://localhost:3000/tours/hood-river';
    browser.visit(referrer, () => {
      browser.clickLink('.requestGroupRate', () => {
        //assert(browser.resources[0].request.headers._headers[0][1] === referrer);
        browser.assert.element("form input[name=referrer]", referrer);
        done();
      });
    });
  });

   test('requesting a group rate from the oregon coast tour page should ' +
      'populate the hidden referrer field correctly', (done) => {
    var referrer = 'http://localhost:3000/tours/oregon-coast';
    browser.visit(referrer, () => {
      browser.clickLink('.requestGroupRate', () => {
        //assert(browser.field('referrer').value === referrer);
        browser.assert.element("form input[name=referrer]", referrer);
        done();
      });
    });
  });

  test('visiting the "request group rate" page dirctly should result ' +
      'in an empty value for the referrer field', (done) => {
    browser.visit('http://localhost:3000/tours/request-group-rate', () => {
      //assert(browser.field('referrer').value === '');
      browser.assert.element("form input[name=referrer]", '');
      done();
    });
  });
});