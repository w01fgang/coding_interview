export const resolvers = {
  Query: {
    orders: () => ({
      edges: [],
      pageInfo: {
        endCursor: null,
        hasNextPage: false,
      },
      totalCount: 0,
    }),
  },
}; 
