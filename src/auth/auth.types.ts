export type UserRole = "ADMIN" | "AGENT";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;

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

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}