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

    agentId: null,
    departmentCode: null,
  },

  {
    id: 2,
    name: "Zeynep Aydın",
    email: "frontoffice@company.com",
    password: "123456",
    role: "AGENT",

    agentId: "d9ab8da9-06b4-4b2f-8245-87ca45432293",
    departmentCode: "FRONT",
  },

  {
    id: 3,
    name: "Kerem Kaya",
    email: "agent@company.com",
    password: "123456",
    role: "AGENT",

    agentId: "6023366c-b116-44af-8929-ce8d9533fcf0",
    departmentCode: "TECH",
  },
];