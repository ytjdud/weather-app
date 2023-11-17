import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'api.openweathermap.org/data/2.5/forecast',
  cache: new InMemoryCache(),
});

export default client;