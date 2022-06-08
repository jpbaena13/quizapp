const express = require('express');
const app = express();
const functions = require('../functions');

app.use(require('./user'));
app.use(require('./login'));
app.use(require('./quiz'));

module.exports = app;