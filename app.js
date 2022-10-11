const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const config = require('./bin/config');

const indexRouter = require('./routes/index');

const folder = . + config.PHOTO_FOLDER;
fs.access(folder, (err) => {
  if(err) {
    fs.mkdirSync(folder, { recursive: true });
  }
});   

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'images')));

app.use('/', indexRouter);

// error handler
app.use(function(err, req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  if (err.statusCode) {
    const response = {
      success: false,
      message: err.message,
      fails: err.fails
    }
   return res.status(err.statusCode).json(response).end();
  } else {
    res.status(500).end();
  }
});

module.exports = app;
