import { apiGet } from "../base.js";

interface FetchTicketsParams {
  page?: number;
  size?: number;
  status?: string;
  priority?: string;
  topicId?: string;
  departmentId?: string;
  regionId?: string;
  slaBreached?: boolean;
  agentId?: string;
  startDate?: string;
  endDate?: string;
}

export function fetchTickets({
  page = 0,
  size = 10,
  status,
  priority,
  topicId,
  departmentId,
  regionId,
  slaBreached,
  agentId,
  startDate,
  endDate,
}: FetchTicketsParams = {}) {
  const params = new URLSearchParams({ page: String(page), size: String(size) });

  if (status) params.set("status", status);
  if (priority) params.set("priority", priority);
  if (topicId) params.set("topicId", topicId);
  if (departmentId) params.set("departmentId", departmentId);
  if (regionId) params.set("regionId", regionId);
  if (slaBreached !== undefined) params.set("slaBreached", String(slaBreached));
  if (agentId) params.set("agentId", agentId);
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);

  return apiGet(`/api/tickets?${params.toString()}`);
}
