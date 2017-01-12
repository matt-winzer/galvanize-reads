var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET all books
router.get('/books', function(req, res, next) {
  return knex('book')
    .then((books) => {
      console.log(books);
      res.render('books', {books: books});
    });
});

// render new book form
router.get('/books/new', function(req, res, next) {
  res.render('newbook');
});

// POST new book
router.post('/', function (req, res) {
  knex('book')
    .insert(req.body)
    .returning('id')
    .then((id) => {
      res.redirect('/books');
    });
});

module.exports = router;
