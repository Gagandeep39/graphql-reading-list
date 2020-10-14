import React, { Component } from 'react';

import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

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
