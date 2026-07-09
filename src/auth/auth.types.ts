export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  agentId: string | null;
  departmentCode: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}
