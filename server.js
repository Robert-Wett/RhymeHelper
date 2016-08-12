const express = require('express');

const PORT = process.env.PORT || 8080;
const RhymeHelper = require('./src/RhymeHelper/rhymeHelper');
const rhymeHelper = new RhymeHelper();
const rhymeHelperLoose = new RhymeHelper(false);
const app = express();

app.get('/:word', (req, res) => {
  const rhymer = req.query.loose ? rhymeHelperLoose : rhymeHelper;

  rhymer.getRhyme(req.params.word || 'orange')
    .then(words => {
      res.json(words);
    })
    .catch(e => {
      res.status(500).send();
    });
});

rhymeHelper._buildTable()
.then(() => {
  return rhymeHelperLoose._buildTable();
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