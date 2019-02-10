const express = require('express');
const morgan = require('morgan');
const {Page, Contant} = require('./db');

const app = express();

app.use(morgan('dev'));
