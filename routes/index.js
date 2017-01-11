var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
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

module.exports = router;
