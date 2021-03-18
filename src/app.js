require('dotenv').config();

const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'templates'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('views/index');
});

app.get('*', (req, res) => {
    res.render('views/404');
});

app.listen(3000, () => {
    console.log('Server up')
});