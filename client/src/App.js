import React from 'react';
import './App.css';
// require('dotenv').config();
import { ApolloProvider, ApolloClient } from '@apollo/client';
import BookList from './components/BookList';

// Apollo Init

const client = new ApolloClient({
  uri: process.env.SERVER_URI,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <h1>Reading List</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
