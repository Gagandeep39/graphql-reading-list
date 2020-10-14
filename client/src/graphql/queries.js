/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-14 11:48:26
 * @modify date 2020-10-14 11:48:26
 * @desc GraphQL queries
 */
import { gql } from '@apollo/client';

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const getBookQuery = gql`
  query ($id: ID){
    book (id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`

export { getBooksQuery, getAuthorsQuery, getBookQuery };
