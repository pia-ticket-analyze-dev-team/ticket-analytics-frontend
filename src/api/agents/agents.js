import { apiGet } from "../base.js";

export function fetchAgentTickets(agentId, { page = 0, size = 10, status = "", priority = "" } = {}) {
  const params = new URLSearchParams({ page: String(page), size: String(size) });

  if (status) {
    params.set("status", status);
  }

  if (priority) {
    params.set("priority", priority);
  }

  return apiGet(`/api/agents/${agentId}/tickets?${params.toString()}`);
}
