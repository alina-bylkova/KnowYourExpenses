const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.set('Accept', 'application/json');
  res.status(200).send('Hello!');
});

module.exports.app = app;

if (!module.parent) {
  app.listen(8080, () => {
    console.log('Server is running on port 8080');
  });
}
