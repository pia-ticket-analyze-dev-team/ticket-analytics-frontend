import { apiGet } from "../base.js";

export function fetchRegionalInsights() {
  return apiGet("/api/regional-insights");
}
