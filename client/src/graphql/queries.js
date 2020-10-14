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

export { getBooksQuery, getAuthorsQuery };
