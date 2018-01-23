const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

require('./config/mongoose.js');

app.use(bodyParser.json());
require('./config/routes.js')(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

app.listen(3050, () => {
  console.log('Running on port 3050');
});
