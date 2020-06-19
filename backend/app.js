const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

const controllers = require('./controllers');

// Serve compiled vue application
app.use('/', express.static(path.join(__dirname, '..', 'frontend', 'dist')));

app.use('/convert', controllers.convert);

module.exports = app;
