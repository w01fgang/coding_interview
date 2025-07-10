type RawOrder = {
  id: string;
  customer: string;
  amount: number;
  createdAt: number;
};

export async function fetchOrders(): Promise<RawOrder[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2_000);

  try {
    const res = await fetch(
      "https://api.jsonbin.io/v3/b/686fa70efb55774d1c72471b",
      {
        headers: {
          "X-Access-Key": "tbd",
        },
        signal: controller.signal,
      }
    );

    return res.json();
  } finally {
    clearTimeout(timeout);
  }
}
