import { useEffect, useState } from "react";

import { fetchCustomers } from "../api/customers/customers.js";
import type { Customer, PagedResponse } from "../components/Customer/customer.types";

interface UseCustomersParams {
  page: number;
  size: number;
  search: string;
}

export function useCustomers({ page, size, search }: UseCustomersParams) {
  const [data, setData] = useState<PagedResponse<Customer> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchCustomers({ page, size, search })
      .then((result: PagedResponse<Customer>) => {
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load customers.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, size, search]);

  return { data, loading, error };
}
