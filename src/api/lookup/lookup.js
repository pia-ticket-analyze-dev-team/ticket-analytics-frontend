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
