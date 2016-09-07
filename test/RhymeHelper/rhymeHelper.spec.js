const expect = require('chai').expect;
const sinon = require('sinon');
const _ = require('lodash');

const RhymeHelper = require('../../src/RhymeHelper/rhymeHelper');

describe('RhymeHelper', () => {
  let rhymeHelper;
  
  describe('#getRhyme()', () => {
    before(() => {
      rhymeHelper = new RhymeHelper();
      sinon.spy(rhymeHelper, '_readAndParseFile');
			sinon.spy(rhymeHelper, '_getWordsUnderNode');
    });

    after(() => {
      rhymeHelper._readAndParseFile.restore();
			rhymeHelper._getWordsUnderNode.restore();
    });

		it('does not try to compute anything it doesnt have a lookup value for', function(done) {
			//dis bitch fails
			this.timeout(5000);
			rhymeHelper.getRhyme('weinerzzzzzzzzz').then(wordlist => {
				expect(wordlist.length).to.not.be.ok;
				expect(rhymeHelper._getWordsUnderNode.calledOnce).to.be.false;
				done();
			})
		});
		
    it('returns matches for word "eternity"', done => {
      rhymeHelper.getRhyme('eternity').then(wordlist => {
        expect(wordlist).to.be.ok;
        expect(wordlist.length).to.be.at.least(1);
        done();
      });
    });

    it('builds the lookup tree on first get', () => {
      expect(rhymeHelper._readAndParseFile.calledOnce).to.be.true;
    });

    it('does not rebuild lookup tree on subsequent requests', done => {
      rhymeHelper.getRhyme('eternity').then(wordlist => {
        expect(wordlist).to.be.ok;
        expect(wordlist.length).to.be.at.least(1);
        expect(rhymeHelper._readAndParseFile.calledOnce).to.be.true;
        done();
      });
    });
  });

  describe('Strict Mode', () => {
    before(function(done){
      this.timeout(3000);
      rhymeHelper = new RhymeHelper();
      rhymeHelper._buildTable().then(done);
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
      this.timeout(3000);
      rhymeHelper = new RhymeHelper(false);
      rhymeHelper._buildTable().then(done);
    });

    it('Returns 4 hits for "noir" in loose mode', function(done) {
      rhymeHelper.getRhyme('noir').then(wordlist => {
        expect(wordlist.length).to.equal(4);
        done();
      });
    });
  });

});