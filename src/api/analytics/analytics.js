import { apiGet } from "../base.js";

export function fetchSlaTargetRate() {
  return apiGet("/api/analytics/sla-target-rate");
}

export function fetchServiceTypeTrend() {
  return apiGet("/api/analytics/service-type-trend");
}
