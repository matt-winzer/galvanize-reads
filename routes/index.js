var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

// GET home page
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// GET all books
router.get('/books', (req, res, next) => {
  return knex('book')
    .then((books) => {
      console.log(books);
      res.render('books', {books: books});
    });
});

// Render new book form
router.get('/books/new', function(req, res, next) {
  res.render('newbook');
});

// GET single book
router.get('/books/:id', (req, res, next) => {
  let id = req.params.id;
  knex('book')
    .where('id', id)
    .first()
    .then((book) => {
      res.render('single_book', {
        id: book.id,
        title: book.title,
        genre: book.genre,
        description: book.description,
        cover_url: book.cover_url,
      });
    });
});

// Render edit book form
router.get('/books/:id/edit', function(req, res, next) {
  let id = req.params.id;
  knex('book')
    .where('id', id)
    .first()
    .then((book) => {
      res.render('edit_book', {
        id: book.id,
        title: book.title,
        genre: book.genre,
        description: book.description,
        cover_url: book.cover_url
      });
    });
});

// PUT route: edit book
router.put('/books/:id/edit', (req, res, next) => {
  let id = req.params.id;
  let edit = req.body;
  knex('book')
    .where('id', id)
    .update(edit)
    .returning('id')
    .then((id) => {
      res.redirect('/' + id);
    });
});

// POST new book
router.post('/', (req, res, next) => {
  knex('book')
    .insert(req.body)
    .returning('id')
    .then((id) => {
      res.redirect('/books');
    });
});


module.exports = router;
