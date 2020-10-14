/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-14 12:49:56
 * @modify date 2020-10-14 12:49:56
 * @desc Display book details, author and its other books
 */
import React from 'react';
import { getBookQuery } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';

function BookDetails({ bookId }) {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: bookId },
  });

  const displayBookDetails = () => {
    if (bookId === '') return <div>No Book selected.</div>;
    if (loading) return <div>Loading...</div>;
    else if (data) {
      const { book } = data;
      return (
        <div>
          <h2> {book.name} </h2>
          <p> {book.genre} </p>
          <p> {book.author.name} </p>
          <p> All books by this author </p>
          <ul className='other-books'>
            {book.author.books.map((item) => (
              <li key={item.id}> {item.name} </li>
            ))}
          </ul>
        </div>
      );
    } else return <div>Error {error}</div>;
  };

  return <div id='book-details'>{displayBookDetails()}</div>;
}

BookDetails.propTypes = {
  bookId: PropTypes.string,
};

export default BookDetails;
