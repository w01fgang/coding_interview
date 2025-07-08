"use client";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

const queryClient = new QueryClient();

const ORDERS_QUERY = `
  query Orders($first: Int!, $after: String) {
    orders(first: $first, after: $after) {
      edges {
        node {
          id
          customer
          amount
          createdAt
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`;

type Order = {
  id: string;
  customer: string;
  amount: number;
  createdAt: string;
};

type OrderEdge = {
  node: Order;
  cursor: string;
};

type OrdersData = {
  edges: OrderEdge[];
  pageInfo: {
    endCursor: string | null;
    hasNextPage: boolean;
  };
  totalCount: number;
};

async function fetchOrders(after: string | null) {
  const res = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: ORDERS_QUERY,
      variables: { first: 10, after },
    }),
  });
  const json = await res.json();
  return json.data.orders as OrdersData;
}

function Orders() {
  const [after, setAfter] = useState<string | null>(null);
  const [history, setHistory] = useState<(string | null)[]>([null]);
  const { data, isLoading, error, isFetching } = useQuery<OrdersData>({
    queryKey: ["orders", after],
    queryFn: () => fetchOrders(after),
  });

  const handleNext = () => {
    if (data?.pageInfo.endCursor) {
      setAfter(data.pageInfo.endCursor);
      setHistory((prev) => [...prev, data.pageInfo.endCursor]);
    }
  };

  const handlePrev = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setAfter(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen text-blue-600">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        Error: {(error as Error).message}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders</h1>
      {isFetching && <div className="text-blue-600 mb-4">Loading...</div>}
      <div className="text-lg font-semibold text-gray-600 mb-4">
        Total: {data?.totalCount}
      </div>
      <ul className="space-y-3 mb-6">
        {data?.edges.map((edge: OrderEdge) => (
          <li
            key={edge.node.id || edge.cursor}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">
                {edge.node.customer}
              </span>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">
                  ${edge.node.amount}
                </div>
                <div className="text-sm text-gray-500">
                  {edge.node.createdAt}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={history.length <= 1}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!data?.pageInfo.hasNextPage}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Orders />
    </QueryClientProvider>
  );
}
