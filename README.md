# RhymeHelper


Using the input from CMU's [SPHINX Project](http://cmusphinx.sourceforge.net/), given a word return a list of rhyming words, annotated by the number of matching phonemes and their phonetic definition, sorted by the number of matching phonemes.

The API is being hosted on [Heroku](http://getrhyme.herokuapp.com) and on [AWS](http://rhymehelper.us-west-2.elasticbeanstalk.com/).

### Routes
#### `GET /api/:word`
 >Get a list of words matching at least 2 phonemes sorted by strength, in strict mode

#### `GET /api/:word?loose=true`
 >Enable loose mode

#### Example output for 'ORANGE' (`GET /orange`)
```
{
    word: "CHALLENGE",
    display: "[3] CHALLENGE: CH AE1 L AH0 N JH",
    strength: 3
},
{
    word: "ALONGE",
    display: "[3] ALONGE: AE1 L AH0 N JH",
    strength: 3
},
{
    word: "COUNTERCHALLENGE",
    display: "[3] COUNTERCHALLENGE: K AW1 N T ER0 CH AE2 L AH0 N JH",
    strength: 3
},
{
    word: "COUNTERCHALLENGE(1)",
    display: "[3] COUNTERCHALLENGE(1): K AW1 N ER0 CH AE2 L AH0 N JH",
    strength: 3
},
{
    word: "LOZENGE",
    display: "[3] LOZENGE: L AO1 Z AH0 N JH",
    strength: 3
},
{
    word: "SCAVENGE",
    display: "[3] SCAVENGE: S K AE1 V AH0 N JH",
    strength: 3
},
{
    word: "BINGE",
    display: "[2] BINGE: B IH1 N JH",
    strength: 2
},
{
    word: "DERANGE",
    display: "[2] DERANGE: D IH0 R EY1 N JH",
    strength: 2
},
{
    word: "DOWNRANGE",
    display: "[2] DOWNRANGE: D AW1 N R EY1 N JH",
    strength: 2
}
```
