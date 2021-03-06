'use strict'

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('config');

let NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  NODE_ENV = process.env.NODE_ENV = 'development';
}

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (req.headers['x-api-key'] || checkApiKey(req.headers['x-api-key'])) {
    next();
  } else {
    res.status(500).json({ Error: "Missing X-Api-Key" })
  }
})

app.use('/api/v1', indexRouter);

//expose config via app
app.config = config;

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function checkApiKey(apiKey) {
  return config.apiKeys.includes(apiKey)
}
app.listen(process.env.NODE_PORT || 4000, () => {
  console.log("sever started at port", process.env.NODE_PORT || 4000)
})
module.exports = app;
