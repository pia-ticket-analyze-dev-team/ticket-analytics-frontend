import { apiPost } from "../base.js";

export function loginRequest(email, password) {
  return apiPost("/api/auth/login", { email, password });
}
