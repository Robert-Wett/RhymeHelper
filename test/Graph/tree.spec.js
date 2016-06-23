const expect = require('chai').expect;

const Node = require('../../src/Graph/node');
const Tree = require('../../src/Graph/tree');

describe('Tree', () => {
  describe('#isBuilt()', () => {
    const tree = new Tree();
    it('returns false when tree is empty', () => {
      expect(tree.isBuilt()).to.be.false;
    });

    it('returns true when node is added', () => {
      tree.addWord('HI', ['H', 'IH']);
      expect(tree.isBuilt()).to.be.true;
    });
  });
  
  
});