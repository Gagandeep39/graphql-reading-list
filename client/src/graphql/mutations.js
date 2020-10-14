/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-14 12:00:00
 * @modify date 2020-10-14 12:00:00
 * @desc GraphQL Mutations
 */
import { gql } from '@apollo/client';

const addBookMutation = gql`
  mutation {
    addBook (name : "", genre : "", authorId : "") {
      name
      id
    }
  }
`;

export { addBookMutation };
