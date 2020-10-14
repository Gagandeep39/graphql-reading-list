/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-14 11:46:55
 * @modify date 2020-10-14 11:46:55
 * @desc Show list of Books
 */
import React, { useState } from 'react';
import BookDetails from './BookDetails';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../graphql/queries';

const BookList = () => {
  const { loading, data } = useQuery(getBooksQuery);
  const [selected, setSelected] = useState('');

  const displayBooks = () => {
    if (loading) return <div>Loading...</div>;
    else
      return data.books.map((book) => (
        <li key={book.id} onClick={() => setSelected(book.id)}>
          {book.name}
        </li>
      ));
  };

  return (
    <div>
      <ul id='book-list'>{displayBooks()}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default BookList;
