import { split } from 'apollo-link'
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws'
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities'


const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjjxgqfod261h0144fy4hky9h',
});

const wsLink = new WebSocketLink({
  uri: 'wss://subscriptions.us-west-2.graph.cool/v1/cjjxgqfod261h0144fy4hky9h',
  options: { reconnect: true },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  // link: httpLink,
  link,
  cache: new InMemoryCache(),
});

export default client;
