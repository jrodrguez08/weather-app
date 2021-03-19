/* eslint-disable no-console */
require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const routes = require('./server/routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'templates'));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', routes);

mongoose.connect(process.env.DB_KEY, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('db ok'));

app.listen(3000, () => console.log('Server up'));
