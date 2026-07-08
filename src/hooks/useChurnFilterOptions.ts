import { useEffect, useState } from "react";

import { fetchCustomerChurnRisk } from "../api/analytics/analytics.js";
import type { ChurnPageResponse } from "../types/churnType";

const RISK_LEVEL_ORDER = ["LOW", "MEDIUM", "HIGH"];

// The backend has no dedicated lookup endpoint for distinct segments/risk
// levels, so we fetch the full churn dataset once and derive them here.
const ALL_RECORDS_SIZE = 5000;

export function useChurnFilterOptions() {
  const [segments, setSegments] = useState<string[]>([]);
  const [riskLevels, setRiskLevels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchCustomerChurnRisk({ page: 0, size: ALL_RECORDS_SIZE })
      .then((result: ChurnPageResponse) => {
        if (cancelled) return;

        const distinctSegments = [
          ...new Set(result.content.map((customer) => customer.customerSegment)),
        ].sort();

        const distinctRiskLevels = RISK_LEVEL_ORDER.filter((level) =>
          result.content.some((customer) => customer.riskLevel === level)
        );

        setSegments(distinctSegments);
        setRiskLevels(distinctRiskLevels);
        setError(null);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load filter options.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { segments, riskLevels, loading, error };
}
