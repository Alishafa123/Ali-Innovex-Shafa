const express = require('express');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/shortens', urlRoutes);

module.exports = app;
