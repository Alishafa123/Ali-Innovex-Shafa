const express = require('express');
const urlRoutes = require('./routes/urlRoutes');

const app = express();

app.use(express.json());
app.use('/shortens', urlRoutes);

module.exports = app;
