const express = require('express');

const PORT = process.env.PORT || 8080;
const RhymeHelper = require('./src/RhymeHelper/rhymeHelper');
const rhymeHelper = new RhymeHelper();
const rhymeHelperLoose = new RhymeHelper(false);
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/dist', express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
	res.sendFile('index.html', { root: __dirname });
})

app.get('/api/:word', (req, res) => {
  const rhymer = req.query.loose ? rhymeHelperLoose : rhymeHelper;

  rhymer.getRhyme(req.params.word || 'orange')
    .then(words => {
      res.jsonp(words);
    })
    .catch(e => {
      res.status(500).send();
    });
});

rhymeHelper._buildTable()
.then(() => {
	return Promise.resolve();
  //return rhymeHelperLoose._buildTable();
})
.then(() => {
  app.listen(PORT, () => {
    console.log('Trees are built, ready to go!');
  });
})
.catch(e => {
  console.error(e);
  console.log('Shit.');
});