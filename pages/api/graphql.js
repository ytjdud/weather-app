import { ApolloServer, } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import resolvers from './resolvers';
import typeDefs from './typeDefs';

const server = new ApolloServer({
  resolvers,
  typeDefs,
  // playground: true,
});


export default startServerAndCreateNextHandler(server);