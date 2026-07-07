import { apiGet, apiPost, apiPut, apiDelete } from "../base.js";

export function fetchCustomers({ page = 0, size = 10, search = "" } = {}) {
  const params = new URLSearchParams({ page: String(page), size: String(size) });

  if (search) {
    params.set("search", search);
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
