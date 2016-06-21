const expect = require('chai').expect;
const _ = require('lodash');

const RhymeHelper = require('../../src/RhymeHelper/rhymeHelper');

describe('RhymeHelper', () => {
  let rhymeHelper;

  describe('Strict Mode', () => {
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

    it('Returns 3 hits for "noir" in strict mode', done => {
      rhymeHelper.getRhyme('noir').then(wordlist => {
        expect(wordlist.length).to.equal(3);
        done();
      });
    });
  });

  describe('Loose Mode', () => {
    before(function(done){
      this.timeout(5000);
      rhymeHelper = new RhymeHelper(false);
      rhymeHelper._readInFileAndBuildTable().then(done);
    });

    it('Returns 4 hits for "noir" in loose mode', function(done) {
      rhymeHelper.getRhyme('noir').then(wordlist => {
        expect(wordlist.length).to.equal(4);
        done();
      });
    });
  });

});