const express = require('express');
const morgan = require('morgan');
const db = require('./db');
const renderPage = require('./views/pageView')

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res, next) => {
  db.getHomePg()
    .then(page => res.redirect(`/pages/${page.id}`))
    .catch(next);
});

app.get('/pages/:id', (req, res, next) => {
  let currentPgAndCont;

  db.getPageAndContents(req.params.id)
    .then(pageAndContents => {
      if (!pageAndContents) res.sendStatus(404);
      else currentPgAndCont = pageAndContents;
    })
    .then(() => db.getAllPages())
    .then(allPages => res.send(renderPage(allPages, currentPgAndCont)))
    .catch(next);
});

module.exports = app;
