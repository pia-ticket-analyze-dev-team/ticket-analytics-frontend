import { apiGet, apiPost, apiPut, apiDelete } from "../base.js";

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

export interface TicketRequestPayload {
  ticketNumber: string;
  customerId: string | null;
  topicId: string | null;
  currentDepartmentId: string | null;
  agentId: string | null;
  regionId: string | null;
  serviceTypeId: string | null;
  infrastructureTypeId: string | null;
  description: string | null;
  status: string;
  priority: string;
  slaBreached: boolean;
  resolutionTimeHours: number | null;
  customerSatisfactionScore: number | null;
  createdAt: string;
  resolvedAt: string | null;
  creationSource: string | null;
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

export function updateTicket(id: string, payload: TicketRequestPayload) {
  return apiPut(`/api/tickets/${id}`, payload);
}

export function deleteTicket(id: string) {
  return apiDelete(`/api/tickets/${id}`);
}

export interface NewCustomerPayload {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  birthdate: string | null;
  phone: string | null;
  segment: string | null;
}

export interface TicketCreatePayload {
  customerId: string | null;
  newCustomer: NewCustomerPayload | null;
  topicId: string;
  currentDepartmentId: string;
  agentId: string;
  regionId: string;
  serviceTypeId: string;
  infrastructureTypeId: string;
  description: string | null;
  status: string;
  priority: string;
  slaBreached: boolean;
  resolutionTimeHours: number | null;
  customerSatisfactionScore: number | null;
  createdAt: string;
  resolvedAt: string | null;
}

export function createTicket(payload: TicketCreatePayload) {
  return apiPost("/api/tickets", payload);
}

export function fetchTicketDepartmentHistory(ticketId: string) {
  return apiGet(`/api/tickets/${ticketId}/department-history`);
}
