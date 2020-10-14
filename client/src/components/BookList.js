/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-14 11:46:55
 * @modify date 2020-10-14 11:46:55
 * @desc Show list of Books
 */
import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getBooksQuery } from '../graphql/queries';
import BookDetails from './BookDetails';

class BookList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    }
  }

  displayBooks() {
    const data = this.props.data;
    if (data.loading) return <div>Loading...</div>;
    else return data.books.map(book => <li key={book.id} onClick={()=> this.setState({selected: book.id})}> {book.name} </li>)
  }

  render() {
    return (
      <div>
        <ul id='book-list'>
          { this.displayBooks() }
        </ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

// Allows graphQL data to be fetched from props
export default graphql(getBooksQuery)(BookList);
