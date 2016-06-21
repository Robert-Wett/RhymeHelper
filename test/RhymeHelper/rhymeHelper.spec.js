const expect = require('chai').expect;
const _ = require('lodash');

const RhymeHelper = require('../../src/RhymeHelper/rhymeHelper');

describe('RhymeHelper', () => {
  let rhymeHelper;

  before(function(done){
    this.timeout(5000);
    rhymeHelper = new RhymeHelper();
    rhymeHelper._readInFileAndBuildTable().then(done);
  });

  it('Returns 2 hits with a match strength of 7 for "solution"', done => {
    rhymeHelper.getRhyme('solution').then(wordlist => {
      const rhymes = wordlist.filter(w => w.strength === 7);
      expect(rhymes.length).to.equal(2);
      done();
    });
  });
});