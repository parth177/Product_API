const express = require('express');
const port = 8000;
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', require('./routes/api'));
app.listen(port, function (err) {
  if (err) {
    console.log('Error');
  }
  console.log('running');
});
