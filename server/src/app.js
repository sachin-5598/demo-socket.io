const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();

// middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.json({
    message: 'Hey! can see u...',
  });
});

// error handling
function notFound(req, res, next) {
  const error = new Error('Not Found - ' + req.originalUrl);
  res.status(404);
  next(error);
}

function errorHandler(error, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    error_status: statusCode,
    error_stack: process.env.NODE_ENV === 'production' ? 'Not Allowed' : error.stack,
  });
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;
