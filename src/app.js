const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Arena = require('bull-arena');
const cors = require('cors');
require("dotenv").config();

const routes = require('./routes/index');
const { queues, Bull } = require('./publisher/queues');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API middlewars

// Allow all origins to access the API
// TODO: (replace with specific origin(s) in production)
app.use(cors());
app.use(process.env.API_VERSION_PREFIX || '/api/v1', routes);

/**
 * Arena configuration for queues UI
 */
const arenaConfig = Arena(
  { Bull, queues },
  {
    basePath: '/arena',
    disableListen: true,
  }
);

app.use('/', arenaConfig);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;

  if (req.url.indexOf('/') >= 0) {
      res.status(404);
      res.json({
          "status": 404,
          "message": "Resource not Found"
      });
      return;
  } else {
      next(err);
      res.redirect('/');
  }
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
