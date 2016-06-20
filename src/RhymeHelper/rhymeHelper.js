const readline = require('readline');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const Tree = require('../Graph/tree');
const Node = require('../Graph/node');

const WORD_DICT = path.resolve('./resource/cmudict-0.7b.txt');
const MDEPTH = 4;

class RhymeHelper {
  constructor() {
    this.filePath = WORD_DICT;
    this.tree = new Tree();
    this.lookup = {};
  }
  // 18442642214

  traverseTreeForWords(node, numMatched, phenomes, list) {
    const nextKey = phenomes.shift();
    if (numMatched < MDEPTH && node.children[nextKey]) {
      return this.traverseTreeForWords(node.children[nextKey], numMatched + 1, [...phenomes], list);
    } else {
      if (node.word) {
        list.push({
          display: `[${numMatched}] ${node.word}: ${this.lookup[node.word].reverse().join(' ')}`,
          numMatched
        });
      }
      _.forIn(node.children, v => {
        if (nextKey && v.key === nextKey) {
          this.traverseTreeForWords(v, numMatched + 1, [...phenomes], list);
        } else {
          this.traverseTreeForWords(v, numMatched, [...phenomes], list);
        }
      });
    }
  }

  rhymesWith(word) {
    return this._readInFileAndBuildTable().then(() => {
      let wordInfo = this.lookup[word.toUpperCase()];
      let start = this.tree.getChild(wordInfo.shift());
      let wordList = [];
      this.traverseTreeForWords(start, 1, wordInfo, wordList);
      wordList.sort((a, b) => {
        return - (a.numMatched - b.numMatched)
      });
      return Promise.resolve(wordList);
    });
  }

  _readInFileAndBuildTable() {
    if (this.tree.isBuilt()) {
      return Promise.resolve();
    }

    const readStream = fs.createReadStream(path.resolve(this.filePath));
    const reader = readline.createInterface({ input: readStream });

    reader.on('line', line => {
      let _lineArr = line.trim().split(' ').filter(v => v !== '');
      let [key, pronunciation] = [_lineArr.shift().toUpperCase(), _lineArr.reverse()];
      // Add to table to get word lookups
      this.lookup[key] = [...pronunciation]
      // Add to tree for finding comparisons
      this.tree.addWord(key, [...pronunciation]);
    });

    return new Promise(resolve => {
      reader.on('close', () => {
        resolve();
      });
    });
  }
}

module.exports = RhymeHelper;