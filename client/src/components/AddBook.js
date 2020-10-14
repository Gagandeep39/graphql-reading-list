/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-14 11:45:46
 * @modify date 2020-10-14 11:45:46
 * @desc Add Books
 */
import React, { useState } from 'react';
import { getAuthorsQuery, getBooksQuery } from '../graphql/queries';
import { addBookMutation } from '../graphql/mutations';
import { useQuery, useMutation } from '@apollo/client';

function AddBook() {
  const { loading: loadingAuthors, data } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    authorId: '',
  });

  const displayAuthors = () => {
    if (loadingAuthors) return <option disabled>Loading...</option>;
    else
      return data.authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
  };

  const submitForm = (event) => {
    event.preventDefault();
    addBook({
      variables: formData,
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  return (
    <form id='add-book' onSubmit={submitForm}>
      <div className='field'>
        <label>Book name</label>
        <input
          required
          type='text'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className='field'>
        <label>Genre</label>
        <input
          required
          type='text'
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
        />
      </div>
      <div className='field'>
        <label>Author</label>
        <select
          onChange={(e) =>
            setFormData({ ...formData, authorId: e.target.value })
          }
        >
          <option>Select Author</option>
          {displayAuthors()}
        </select>
      </div>
      <button type='submit'>+</button>
    </form>
  );
}

export default AddBook;
