import { apiGet } from "../base.js";

export function fetchRegions() {
  return apiGet("/api/regions");
}

export function fetchDepartments() {
  return apiGet("/api/departments");
}

export function fetchIssueTopics() {
  return apiGet("/api/topics");
}

export function fetchAgents() {
  return apiGet("/api/agents");
}

export function fetchServiceTypes() {
  return apiGet("/api/service-types");
}

export function fetchInfrastructureTypes() {
  return apiGet("/api/infrastructure-types");
}
