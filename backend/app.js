const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const controllers = require('./controllers');

app.use('/convert', controllers.convert);

module.exports = app;
