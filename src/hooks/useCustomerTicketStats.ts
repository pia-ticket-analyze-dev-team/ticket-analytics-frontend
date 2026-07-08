import { useEffect, useState } from "react";

import { fetchCustomerTicketStats } from "../api/customers/customers.js";
import type { CustomerTicketStats } from "../components/Customer/customer.types";

export function useCustomerTicketStats(id: string | undefined, refreshKey = 0) {
  const [data, setData] = useState<CustomerTicketStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const request: Promise<CustomerTicketStats> = id
      ? fetchCustomerTicketStats(id)
      : Promise.reject(new Error("No customer id provided."));

    request
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load customer stats.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, refreshKey]);

  return { data, loading, error };
}
