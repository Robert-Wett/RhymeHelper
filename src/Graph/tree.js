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
    let node = parent.addChildIfNotExists(new Node(childInfo.shift()));
    if (childInfo.length) {
      this._addChildren(node, childInfo, word);
    } else {
      node.word = word;
    }
  }
}

module.exports = Tree;
