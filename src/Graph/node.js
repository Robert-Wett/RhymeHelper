class Node {
  constructor(key, word = null, children = {}) {
    this.key = key;
    this.word = word;
    this.children = children;
  }

  addChildIfNotExists(node) {
    if (!this.children[node.key]) {
      this.children[node.key] = node;
    }
    return this.children[node.key];
  }

  getChild(key) {
    return this.children[key];
  }

  get hasChildren() {
    return Object.keys(this.children).length;
  }
}

module.exports = Node;
