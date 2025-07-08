export const resolvers = {
  Query: {
    orders: () => ({
      edges: [
        {
          node: { id: "1", customer: "test", amount: 1, createdAt: new Date() },
        },
      ],
      pageInfo: {
        endCursor: null,
        hasNextPage: false,
      },
      totalCount: 0,
    }),
  },
};
