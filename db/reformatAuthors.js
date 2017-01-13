function reformatAuthors(books) {
  const reformatted = [];
  const authorsById = {};

  books.forEach((author) => {
    if (authorsById[author.author_id]) {
      authorsById[author.author_id].books.push({
        book_id: author.book_id,
        book_title: author.book_title,
        book_genre: author.book_genre,
        book_description: author.book_description,
        book_cover_url: author.book_cover_url
      });
    } else {
      authorsById[author.author_id] = {
        author_id: author.author_id,
        author_first_name: author.author_first_name,
        author_last_name: author.author_last_name,
        author_biography: author.author_biography,
        author_portrait_url: author.author_portrait_url,
        books: [{
          book_id: author.book_id,
          book_title: author.book_title,
          book_genre: author.book_genre,
          book_description: author.book_description,
          book_cover_url: author.book_cover_url
        }]
      };
      reformatted.push(authorsById[author.author_id]);
    };
  });
  return reformatted;
}

module.exports = {
  reformatAuthors
};
