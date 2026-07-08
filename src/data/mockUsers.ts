import type { User } from "../auth/auth.types";

export interface MockUser extends User {
  password: string;
}

export const mockUsers: MockUser[] = [
  {
    id: 1,
    name: "System Admin",
    email: "admin@company.com",
    password: "123456",
    role: "ADMIN",
  },
  {
    id: 2,
    name: "Front Office",
    email: "frontoffice@company.com",
    password: "123456",
    role: "FRONT_OFFICE",
  },
  {
    id: 3,
    name: "Mehmet Kaya",  
    email: "agent@company.com",
    password: "123456",
    role: "AGENT",
  },
];