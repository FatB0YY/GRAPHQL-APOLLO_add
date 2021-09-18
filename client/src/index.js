import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
// InMemoryCache для кеширования
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    // адрес сервера
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
})

ReactDOM.render(
    // связываем с реакт приложением
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
  document.getElementById('root')
);
