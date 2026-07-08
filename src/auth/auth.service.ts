import { mockUsers } from "../data/mockUsers";
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
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  currentUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
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