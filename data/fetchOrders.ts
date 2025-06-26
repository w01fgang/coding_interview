type RawOrder = {
  id: string;
  customer: string;
  amount: number;
  createdAt: number;
}

export async function fetchOrders(): Promise<RawOrder[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2_000);

  try {
    const res = await fetch('https://example.com/api/v1/orders', {
      signal: controller.signal,
    });

    return res.json();
  } finally {
    clearTimeout(timeout);
  }
}
