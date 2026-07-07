import { useEffect, useState } from "react";

import { fetchCustomerTickets } from "../api/customers/customers.js";
import type { CustomerTicket, PagedResponse } from "../components/Customer/customer.types";

interface UseCustomerTicketsParams {
  page: number;
  size: number;
}

export function useCustomerTickets(id: string | undefined, { page, size }: UseCustomerTicketsParams) {
  const [data, setData] = useState<PagedResponse<CustomerTicket> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const request: Promise<PagedResponse<CustomerTicket>> = id
      ? fetchCustomerTickets(id, { page, size })
      : Promise.reject(new Error("No customer id provided."));

    request
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load customer tickets.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, page, size]);

  return { data, loading, error };
}
