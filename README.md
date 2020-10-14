# GraphQL

- [GraphQL](#graphql)
  - [Running the application](#running-the-application)
    - [Local Environemnt](#local-environemnt)
  - [Rest API](#rest-api)
    - [Limitation](#limitation)
  - [GraphQL API](#graphql-api)
  - [Working](#working)
  - [Importantterms](#importantterms)
  - [Implementation](#implementation)
    - [Dependencies](#dependencies)
    - [Initialize](#initialize)
    - [Schemas](#schemas)
    - [Root Query](#root-query)
  - [Server side flow](#server-side-flow)
  - [GET request](#get-request)
    - [GraphQL request](#graphql-request)
  - [GET request to get nested data](#get-request-to-get-nested-data)
    - [GraphQL request](#graphql-request-1)
  - [GraphQL Nested Lists](#graphql-nested-lists)
    - [Request](#request)
  - [GraphQL Lists](#graphql-lists)
    - [Request](#request-1)
  - [Mutation](#mutation)
    - [Server Code](#server-code)
    - [POST Request](#post-request)
  - [GraphQLNonNull](#graphqlnonnull)
  - [Utilities](#utilities)
  - [GraphQL Client](#graphql-client)
    - [Installation](#installation)
    - [Initialization](#initialization)
    - [Accessing data](#accessing-data)
  - [Notes](#notes)

## Running the application

### Local Environemnt
- `npm run dev` - Concurrently starts client and server
- Create a `.env` in root of client with `REACT_APP_SERVER_URI` for Server URL
- Create a .env in root of whole application for mongo uri with key `MONGO_URI`

## Rest API

- Stateless, client-independentAPI for exchanging data

### Limitation

- We need to pass all the data in response, We cant respond wih specific fields else create more endpoints
- Udating requires updating all endpoints
- API becomes difficult to understand with more endpoints

## GraphQL API

- Stateless, client-independentAPI for exchanging data with **higher query flexibility**
- Uses type query language

## Working

1. Send a request to srever with POST `/graphql`
2. Enter the graphql query in the post reuqest body

```graphql
{
  query {
    user {
      name
      age
    }
  }
}
```

## Importantterms

1. Query - Retrieve GET
2. Mutation - Manipulate using POST, PUT, PATCH, DELETE
3. Subscription - Set up realtime connection via websockets

## Implementation

### Dependencies

- `graphql`
- `express-graphql`

### Initialize

```js
const { graphqlHTTP } = require('express-graphql');
const app = express();
app.use('/graphql', graphqlHTTP({}));
```

### Schemas
- Define structure of Object
```js
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});
```
### Root Query
- Define how the requests must be handled
```js
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from source
        return _.find(books, { id: args.id });
      },
    }
  },
});

```
## Server side flow

1. Create schema
2. Create RootQuery - Parses the client graphql request
3. Create

## GET request
### GraphQL request
1. Send a get request to the `url/graphql`
2. Create the body as 
```
{
  book(id: "1001") {
    name
    id
  }
}
```

## GET request to get nested data
### GraphQL request
```graphql
{
  book(id: "1001") {
    name
    id
    author {
      name
    }
  }
}
```

## GraphQL Nested Lists
### Request
```graphql
{
  author(id: 1001){
    id
    name
    books {
      name
    }
  }
}
```

## GraphQL Lists
### Request
```graphql
{
  books{
    id
    name
    author{
      name
    }
  }
}
```

## Mutation
- Storing data in server
### Server Code
```js
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  mutation: Mutation,
});

```
### POST Request
```graphql
mutation {
  addAuthor (name: "Troye Sivan", age: 24){
   name
   age
 }
}
```
- `addAuthor` Name of Mutation
- `name, age` are the parameter to be returned


## GraphQLNonNull
- Used for null validation
```js
// Can be used with mutation as 
addBook: {
  type: BookType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(GraphQLID) },
  },
  // ...
},
```


## Utilities

- `lodash` Used to execute mongoDB type queries in an array

```js
const _ = require('lodash');
return _.find(bookArr, { id: 12 });
```

## GraphQL Client
- To make a reuest to GraphQL erver we need a graphQL client
- Apollo library is used to make GraphQL requests

### Installation
- `npm install @apollo/client graphql`

### Initialization
```js
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        
      </div>
    </ApolloProvider>
  );
}
```

### Accessing data
```js
import React, { Component } from 'react';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';

// GraphQL query
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
      </div>
    );
  }
}

// Allows graphQL data to be fetched from props
export default graphql(getBooksQuery)(BookList);
```

## Notes
- Why arraw function
  - Creates query when method is called
  - In scipt code, if we call a method that isnt defined before calling we get type error. Array fun prevents this error by creating query at runtime
