const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const OpenApiValidator = require('express-openapi-validator');
const config = require('./bin/config');

const indexRouter = require('./routes/index');

const folder = config.PHOTO_FOLDER;
fs.access(folder, (err) => {
  if (err) {
    fs.mkdirSync(folder, { recursive: true });
  }
});

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(
  OpenApiValidator.middleware({
    apiSpec: './api/openapi.yaml',
    ignoreUndocumented: true
  }),
);
app.use(bodyParser.urlencoded());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./images'));

app.use('/', indexRouter);

// error handler
app.use(function (error, req, res, next) {
  res.status(error.status || 500).json({
    success: false,
    message: error.message,
    fails: error.fails,
    errors: error.errors,
  });
});

module.exports = app;
