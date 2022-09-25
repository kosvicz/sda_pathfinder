const levels = require('../lib/levels');
const expect = require('chai').expect;

suite('Testing levels', () => {
  test('getLevel() should return level', () => {
    expect(typeof levels.getLevel() === 'string');
  });
});