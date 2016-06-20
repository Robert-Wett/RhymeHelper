const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require('lodash');

const RhymeHelper = require('../../src/RhymeHelper/rhymeHelper');

describe('RhymeHelper', () => {
  it("Returns rhiznymes for 'basket'", done => {
    const rhymeHelper = new RhymeHelper();
    rhymeHelper.rhymesWith('basket').then((wordlist) => {
      expect(wordlist).to.be.ok;
      done();
    });
  });
});