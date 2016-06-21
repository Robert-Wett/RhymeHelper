const readline = require('readline');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const Tree = require('../Graph/tree');
const Node = require('../Graph/node');

const WORD_DICT = path.resolve('./resource/cmudict-0.7b.txt');
const MDEPTH = 2;

class RhymeHelper {
  constructor() {
    this.filePath = WORD_DICT;
    this.tree = new Tree();
    this.lookup = {};
  }

  getRhyme(word) {
    return this._readInFileAndBuildTable().then(() => {
      let wordInfo = [...this.lookup[word.toUpperCase()]];
      let rootNode = this.tree.getChild(wordInfo.shift());
      for (let i = 1; i < MDEPTH; i++) {
        rootNode = rootNode.getChild(wordInfo.shift());
      }

      return Promise.all(
        this.getWordsUnderNode(rootNode, [...wordInfo], word.toUpperCase())
      ).then(p => {
        p.sort((a, b) => {
          return - (a.strength - b.strength)
        });

        return p.filter(p => p.word !== word.toUpperCase());
      })
    });
  }

  getWordsUnderNode(node, phenomes, searchWord) {
    let list = [].concat(
      Object.keys(node.children).map(
        k => this.getWordsUnderNode(node.children[k], [...phenomes].slice(1), searchWord)
      )
    );

    if (node.word) {
      let strength = getStrength(this.lookup[searchWord], this.lookup[node.word]);
      list.push(Promise.resolve({
        word: node.word,
        display: `[${strength}] ${node.word}: ${[...this.lookup[node.word]].reverse().join(' ')}`,
        strength
      }));
    }

    return _.flattenDeep(list);
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

const getStrength = (baseWord, matchWord) => {
  let strength = 0;
  for (let i = 0; i < baseWord.length && i < matchWord.length; i++) {
    if (baseWord[i] === matchWord[i]) {
      strength++;
    } else {
      return strength;
    }
  }

  return strength;
}

module.exports = RhymeHelper;
