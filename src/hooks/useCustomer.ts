import { useEffect, useState } from "react";

import { fetchCustomerById } from "../api/customers/customers.js";
import type { Customer } from "../components/Customer/customer.types";

export function useCustomer(id: string | undefined) {
  const [data, setData] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const request: Promise<Customer> = id
      ? fetchCustomerById(id)
      : Promise.reject(new Error("No customer id provided."));

    request
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load customer details.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { data, loading, error };
}
