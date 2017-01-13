function reformatBooks(books) {
  const reformatted = [];
  const booksById = {};

  books.forEach((book) => {
    if (booksById[book.book_id]) {
      booksById[book.book_id].authors.push({
        author_id: book.author_id,
        first_name: book.author_first_name,
        last_name: book.author_last_name
      });
    } else {
      booksById[book.book_id] = {
        book_id: book.book_id,
        book_title: book.book_title,
        book_genre: book.genre,
        book_description: book.description,
        book_cover_url: book.cover_url,
        authors: [{
          author_id: book.author_id,
          first_name: book.author_first_name,
          last_name: book.author_last_name,
          biography: book.author_biography,
          portrait_url: book.author_portrait_url
        }]
      };
      reformatted.push(booksById[book.book_id]);
    };
  });
  return reformatted;
}

module.exports = {
  reformatBooks
};
