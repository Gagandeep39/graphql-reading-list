/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-14 12:49:56
 * @modify date 2020-10-14 12:49:56
 * @desc [description]
 */
import { graphql } from '@apollo/client/react/hoc';
import React, { Component } from 'react'
import { getBookQuery } from '../graphql/queries';

class BookDetails extends Component {
  render() {
    console.log(this.props);
    return (
      <div id='book-details'>
        <p>Output book details here</p>
      </div>
    )
  }
}
export default graphql(getBookQuery)(BookDetails);
