import { apiGet } from "../base.js";

export function fetchKpiSummary() {
  return apiGet("/api/dashboard/kpi-summary");
}

export function fetchTicketVolume() {
  return apiGet("/api/dashboard/charts/volume");
}

export function fetchTicketsByStatus() {
  return apiGet("/api/dashboard/charts/status");
}

export function fetchTicketsByRegion() {
  return apiGet("/api/dashboard/charts/region");
}

export function fetchTopIssueTopics() {
  return apiGet("/api/dashboard/charts/topics");
}

export function fetchDepartmentWorkload() {
  return apiGet("/api/dashboard/charts/department-workload");
}

