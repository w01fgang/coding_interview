export const typeDefs = `
scalar DateTime

type Order {
  id: ID!
  customer: String!
  amount: Float!
  createdAt: DateTime!
}

"""
Relay Connection wrapper
"""
type OrderEdge {
  node: Order!
  cursor: String!
}

type PageInfo {
  endCursor: String
  hasNextPage: Boolean!
}

type OrderConnection {
  edges: [OrderEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type Query {
  """
  Standard forward-pagination signature.
  'first'  – max number of items to return (1..100)
  'after'  – opaque cursor returned from previous call (optional)
  """
  orders(first: Int!, after: String): OrderConnection!
}
`;
