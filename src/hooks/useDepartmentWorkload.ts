import { fetchDepartmentWorkload } from "../api/dashboard/dashboard.js";
import type { NamedCount } from "../types/dashboard";
import { useAsyncData } from "./useAsyncData";

export const useDepartmentWorkload = () =>
  useAsyncData<NamedCount[]>(fetchDepartmentWorkload, "Couldn't load department workload.");
