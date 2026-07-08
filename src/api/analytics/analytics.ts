import { apiGet } from "../base.js";

interface FetchCustomerChurnRiskParams {
  page?: number;
  size?: number;
  segment?: string;
  riskLevel?: string;
}

export function fetchCustomerChurnRisk({
  page = 0,
  size = 50,
  segment,
  riskLevel,
}: FetchCustomerChurnRiskParams = {}) {
  const params = new URLSearchParams({ page: String(page), size: String(size) });

  if (segment) params.set("segment", segment);
  if (riskLevel) params.set("riskLevel", riskLevel);

  return apiGet(`/api/analytics/customer-churn-risk?${params.toString()}`);
}
