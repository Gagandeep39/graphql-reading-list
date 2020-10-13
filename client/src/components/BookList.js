import React, { Component } from 'react';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

class BookList extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <ul id='book-list'>
          <li>Gates to Infinity</li>
        </ul>
      </div>
    );
  }
}

// Allows graphQL data to be fetched from props
export default graphql(getBooksQuery)(BookList);
