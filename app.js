require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const hbs = require('hbs');

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + "/views/partials");

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App running at port ${port} 🚀🚀`))