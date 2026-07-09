import { apiGet, apiPost, apiPut, apiDelete } from "../base.js";

export function fetchCustomers({ page = 0, size = 10, search = "", segment = "" } = {}) {
  const params = new URLSearchParams({ page: String(page), size: String(size) });

  if (search) {
    params.set("search", search);
  }

  if (segment) {
    params.set("segment", segment);
  }

  return apiGet(`/api/customers?${params.toString()}`);
}

export function fetchCustomerById(id) {
  return apiGet(`/api/customers/${id}`);
}

export function createCustomer(customer) {
  return apiPost("/api/customers", customer);
}

export function updateCustomer(id, customer) {
  return apiPut(`/api/customers/${id}`, customer);
}

export function deleteCustomer(id) {
  return apiDelete(`/api/customers/${id}`);
}

export function fetchCustomerTickets(id, { page = 0, size = 10 } = {}) {
  const params = new URLSearchParams({ page: String(page), size: String(size) });
  return apiGet(`/api/customers/${id}/tickets?${params.toString()}`);
}

export function fetchCustomerTicketStats(id) {
  return Promise.all([
    apiGet(`/api/customers/${id}/tickets/total-count`),
    apiGet(`/api/customers/${id}/tickets/open-count`),
    apiGet(`/api/customers/${id}/tickets/sla-breach-count`),
    apiGet(`/api/customers/${id}/tickets/avg-satisfaction`),
  ]).then(([totalTickets, openTickets, slaBreachCount, averageSatisfactionScore]) => ({
    totalTickets,
    openTickets,
    slaBreachCount,
    averageSatisfactionScore,
  }));
}
