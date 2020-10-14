/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-14 11:45:46
 * @modify date 2020-10-14 11:45:46
 * @desc Add Books
 */
import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getAuthorsQuery } from '../graphql/queries';

class AddBook extends Component {
  displayAuthors() {
    const data = this.props.data;
    if (data.loading) return <option disabled>Loading...</option>;
    else
      return data.authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
  }

  render() {
    return (
      <form id='add-book' onSubmit={(e)=>{e.preventDefault()}}>
        <div className='field'>
          <label>Book name</label>
          <input type='text' />
        </div>
        <div className='field'>
          <label>Genre</label>
          <input type='text' />
        </div>
        <div className='field'>
          <label>Author</label>
          <select>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button type='submit'>+</button>
      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);
