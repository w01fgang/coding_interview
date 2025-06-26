import { createYoga, createSchema } from 'graphql-yoga';
import { typeDefs } from './schema';
import { resolvers } from './resolvers/resolvers';
import { DateTime } from './resolvers/dateTimeScalar';

const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers: [resolvers, { DateTime }],
  }),
  graphqlEndpoint: '/api/graphql',
});


export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
