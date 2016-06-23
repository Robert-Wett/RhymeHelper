const expect = require('chai').expect;

const Node = require('../../src/Graph/node');

describe('Node', () => {
  describe('#constructor()', () => {
    it('sets defaults for word and children', () => {
      const node = new Node('HI');
      expect(node.word).to.be.null;
      expect(node.children).to.be.ok;
      expect(Object.keys(node.children).length).to.equal(0);
    });
  });

  describe('#addChildIfNotExists()', () => {
    const [node1, node2] = [new Node('1'), new Node('2', 'HI MOM')];

    it('adds child node to internal children object', () => {
      node1.addChildIfNotExists(node2);
      expect(node1.getChild(node2.key)).to.be.ok;
      expect(node1.getChild(node2.key)).to.eql(node2);
    });

    it('does not overwrite nodes that exist already', () => {
      const node3 = new Node('2', 'DIFFERENT VALUE');
      node1.addChildIfNotExists(node3);
      expect(node1.getChild(node3.key).word).to.equal(node2.word);
    });

    it('returns a reference to recently added node', () => {
      const newNode = node1.addChildIfNotExists(new Node('somekey', 'First Value'));
      expect(newNode.word).to.equal('First Value');
      newNode.word = 'Some Other Value';
      expect(node1.getChild(newNode.key).word).to.equal('Some Other Value');
    });
  });

  describe('#hasChildren()', () => {
    const [node1, node2] = [new Node('1'), new Node('2', 'HI MOM')];

    it('returns false if no children', () => {
      expect(node1.hasChildren).to.be.false;
    });

    it('returns true if has children', () => {
      node1.addChildIfNotExists(node2);
      expect(node1.hasChildren).to.be.true;
    });
  });

});