var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var reformat = require('../db/reformatBooks');
var reformatAuthors = require('../db/reformatAuthors');

// GET home page
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// GET all books with authors
router.get('/books', (req, res, next) => {
  knex('book')
    .select(
    'book.title as book_title',
    'book.id as book_id',
    'book.genre',
    'book.description',
    'book.cover_url',
    'author.id as author_id',
    'author.first_name as author_first_name',
    'author.last_name as author_last_name',
    'author.biography',
    'author.portrait_url'
    )
    .join('book_author', 'book_author.book_id', 'book.id')
    .join('author', 'author.id', 'book_author.author_id')
    .then((books) => {
      const reformatted = reformat.reformatBooks(books);
      res.render('books', {reformatted:reformatted});
    });
});

// Render new book form
router.get('/books/new', (req, res, next) => {
  res.render('newbook');
});

// GET single book
router.get('/books/:id', (req, res, next) => {
  let id = req.params.id;
  knex('book')
    .select(
    'book.title as book_title',
    'book.id as book_id',
    'book.genre',
    'book.description',
    'book.cover_url',
    'author.id as author_id',
    'author.first_name as author_first_name',
    'author.last_name as author_last_name',
    'author.biography',
    'author.portrait_url'
    )
    .join('book_author', 'book_author.book_id', 'book.id')
    .join('author', 'author.id', 'book_author.author_id')
    .where('book_id', id)
    .then((book) => {
      const reformatted = reformat.reformatBooks(book);
      res.render('single_book', {reformatted:reformatted});
    });
});

// Render edit book form
router.get('/books/:id/edit', (req, res, next) => {
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
      res.redirect('/books/' + id);
    });
});

// DELETE book route
router.delete('/books/:id', (req, res) => {
  let id = req.params.id;
  knex('book')
    .where('id', id)
    .del()
    .then((result) => {
      res.redirect('/books');
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

// GET all authors with books
router.get('/authors', (req, res, next) => {
  knex('book')
    .select(
    'book.title as book_title',
    'book.id as book_id',
    'book.genre',
    'book.description',
    'book.cover_url',
    'author.id as author_id',
    'author.first_name as author_first_name',
    'author.last_name as author_last_name',
    'author.biography',
    'author.portrait_url'
    )
    .join('book_author', 'book_author.book_id', 'book.id')
    .join('author', 'author.id', 'book_author.author_id')
    .then((authors) => {
      const reformatted = reformatAuthors.reformatAuthors(authors);
      res.render('authors', {reformatted:reformatted});
    });
});

// Render new author form
router.get('/authors/new', (req, res, next) => {
  res.render('newauthor');
});

// GET single author
router.get('/authors/:id', (req, res, next) => {
  let id = req.params.id;
  knex('book')
    .select(
    'book.title as book_title',
    'book.id as book_id',
    'book.genre',
    'book.description',
    'book.cover_url',
    'author.id as author_id',
    'author.first_name as author_first_name',
    'author.last_name as author_last_name',
    'author.biography',
    'author.portrait_url'
    )
    .join('book_author', 'book_author.book_id', 'book.id')
    .join('author', 'author.id', 'book_author.author_id')
    .where('author_id', id)
    .then((author) => {
      const reformatted = reformatAuthors.reformatAuthors(author);
      console.log(reformatted);
      res.render('single_author', {reformatted:reformatted});
    });
});


// Render edit author form
router.get('/authors/:id/edit', (req, res, next) => {
  let id = req.params.id;
  knex('author')
    .where('id', id)
    .first()
    .then((author) => {
      res.render('edit_author', {
        id: author.id,
        first_name: author.first_name,
        last_name: author.last_name,
        biography: author.biography,
        portrait_url: author.portrait_url
      });
    });
});

// PUT route: edit author
router.put('/authors/:id/edit', (req, res, next) => {
  let id = req.params.id;
  let edit = req.body;
  knex('author')
    .where('id', id)
    .update(edit)
    .returning('id')
    .then((id) => {
      res.redirect('/authors/' + id);
    });
});

// DELETE author route
router.delete('/authors/:id', (req, res) => {
  let id = req.params.id;
  knex('author')
    .where('id', id)
    .del()
    .then((result) => {
      res.redirect('/authors');
    });
});

// POST new author
router.post('/newauthor', (req, res, next) => {
  knex('author')
    .insert(req.body)
    .returning('id')
    .then((id) => {
      res.redirect('/authors');
    });
});

module.exports = router;
