import React from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './apollo/client';
import Chat from './pages/Chat';

import '../config/ReactotronConfig';

console.tron.log('Oi');

export const App = () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);
