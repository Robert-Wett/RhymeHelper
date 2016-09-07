const readline = require('readline');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const Tree = require('../Graph/tree');
const Node = require('../Graph/node');

const WORD_DICT = path.resolve('./resource/cmudict-0.7b.txt');
const MDEPTH = 2;

class RhymeHelper {
  constructor(useStrict = true) {
    this.useStrict = useStrict;
    this.filePath = WORD_DICT;
    this.tree = new Tree();
    this.lookup = {};
  }

  getRhyme(word) {
    return this._buildTable().then(() => {
      let wordInfo = [...this.lookup[word.toUpperCase()]];

			// We don't have this word in our bank
			if (!wordInfo) {
				return [];
			}

      let rootNode = this.tree.getChild(wordInfo.shift());
      for (let i = 1; i < MDEPTH; i++) {
        rootNode = rootNode.getChild(wordInfo.shift());
      }

      return Promise.all(
        this._getWordsUnderNode(rootNode, [...wordInfo], word.toUpperCase())
      ).then(p => {
        p.sort((a, b) => {
          return - (a.strength - b.strength)
        });

        return p.filter(p => p.word !== word.toUpperCase());
      })
    });
  }
  
  getWordPhenomes(word) {
    return this.lookup[word.toUpperCase()];
  }

  _getWordsUnderNode(node, phenomes, searchWord) {
    let list = [].concat(
      Object.keys(node.children).map(
        k => this._getWordsUnderNode(node.children[k], [...phenomes].slice(1), searchWord)
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

  _readAndParseFile() {
    const readStream = fs.createReadStream(path.resolve(this.filePath));
    const reader = readline.createInterface({ input: readStream });

    reader.on('line', line => {
      let _lineArr = line.trim().split(' ').filter(v => v !== '');
      let [key, pronunciation] = [_lineArr.shift().toUpperCase(), _lineArr.reverse()];

      if (!this.useStrict) {
        pronunciation = removeStress(pronunciation);
      }
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

  _buildTable() {
    if (this.tree.isBuilt()) {
      return Promise.resolve();
    }

    return this._readAndParseFile();
  }
}

const removeStress = (phenomes) => {
  return phenomes.map(p => p.replace(/\d/g, ''));
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