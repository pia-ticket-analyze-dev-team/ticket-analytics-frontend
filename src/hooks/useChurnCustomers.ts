import { useEffect, useState } from "react";

import { fetchCustomerChurnRisk } from "../api/analytics/analytics.js";
import type { ChurnPageResponse } from "../types/churnType.js";

interface UseChurnCustomersParams {
  page: number;
  size: number;
  segment?: string;
  riskLevel?: string;
}

export function useChurnCustomers({ page, size, segment, riskLevel }: UseChurnCustomersParams) {
  const [data, setData] = useState<ChurnPageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchCustomerChurnRisk({ page, size, segment, riskLevel })
      .then((result: ChurnPageResponse) => {
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load churn data.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, size, segment, riskLevel]);

  return { data, loading, error };
}
