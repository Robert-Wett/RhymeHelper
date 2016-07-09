const RhymeHelper = require('./src/RhymeHelper/rhymeHelper');
const rhymer = new RhymeHelper();
const _ = require('lodash');

const song = `Day 'n' nite
I toss and turn, I keep stress in my mind, mind
I look for peace but see I don't attain
What I need for keeps, this silly game we play...play
Now look at this
Madness the magnet keeps attracting me, me
I try to run, but see I'm not that fast
I think I'm first, but surely finish last, last`;

let wordMap = new Map();
// Correct for things like this so it'll register hopefully as a real word, phonetically
wordMap.set('n', 'in');
wordMap.set('nite', 'night');

let lines = song.split('\n')
  .map(s => s.replace(/[^A-Za-z ]/g, ""))
  .map(s => s.split(' '))
  .map(line => line.map(s => wordMap.get(s) || s));

rhymer.getRhyme('mind').then(words => {
  let stfu = _.flattenDeep(lines);
  let _words = words.map(w => w.word);
  stfu.forEach(s => {
    if (~_words.indexOf(s.toUpperCase())) {
      console.log(s);
    }
  });
});


