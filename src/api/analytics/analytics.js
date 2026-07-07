import { apiGet } from "../base.js";

export function fetchSlaTargetRate() {
  return apiGet("/api/analytics/sla-target-rate");
}

export function fetchServiceTypeTrend() {
  return apiGet("/api/analytics/service-type-trend");
}

// Requests a single large page since the UI shows every agent in one list
// rather than paginating.
export function fetchAgentPerformance() {
  return apiGet("/api/analytics/agent-performance?page=0&size=100");
}
