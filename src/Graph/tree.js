const Node = require('./node');

class Tree {
  constructor() {
    this.tree = {};
  }

  isBuilt() {
    return Object.keys(this.tree).length;
  }

  getChild(key) {
    return this.tree[key];
  }

  addWord(word, phenomes) {
    let node = this.tree[phenomes[0]];
    if (node) {
      phenomes.shift();
    } else {
      node = new Node(phenomes.shift());
      this.tree[node.key] = node;
    }
    this._addChildren(node, phenomes, word);
  }

  _addChildren(parent, childInfo, word) {
    let node = new Node(childInfo.shift(), parent);
    parent.addChildIfNotExists(node);
    if (childInfo.length) {
      this._addChildren(parent.children[node.key], childInfo, word);
    } else {
      node.word = word;
    }
  }
}

module.exports = Tree;
