import { loginRequest } from "../api/auth/auth.js";
import type {
  LoginRequest,
  SignupRequest,
  User,
} from "./auth.types";

let currentUser: User | null = null;

export const login = async ({
  email,
  password,
}: LoginRequest): Promise<User> => {
  const response = await loginRequest(email, password);

  currentUser = {
    id: response.userId,
    name: response.fullName,
    email: response.email,
    role: response.role,
    agentId: response.agentId,
    departmentCode: response.departmentCode,
  };

  return currentUser;
};

export const signup = async (
  _data: SignupRequest
): Promise<User> => {
  throw new Error("Not implemented");
};

export const getCurrentUser = async (): Promise<User> => {
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  return currentUser;
};

export const logout = async (): Promise<void> => {
  currentUser = null;
};
