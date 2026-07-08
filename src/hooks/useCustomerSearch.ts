import { useEffect, useState } from "react";

import { fetchCustomers } from "../api/customers/customers.js";
import type { Customer, PagedResponse } from "../components/Customer/customer.types";

const DEBOUNCE_MS = 300;

export function useCustomerSearch(query: string) {
  const [results, setResults] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const trimmed = query.trim();

    const timeout = setTimeout(() => {
      if (!trimmed) {
        if (!cancelled) {
          setResults([]);
          setLoading(false);
        }
        return;
      }

      if (!cancelled) setLoading(true);

      fetchCustomers({ page: 0, size: 10, search: trimmed })
        .then((result: PagedResponse<Customer>) => {
          if (!cancelled) setResults(result.content ?? []);
        })
        .catch(() => {
          if (!cancelled) setResults([]);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [query]);

  return { results, loading };
}
