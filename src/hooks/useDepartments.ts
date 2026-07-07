import { fetchDepartments } from "../api/lookup/lookup.js";
import type { LookupOption } from "../types/lookup";
import { useAsyncData } from "./useAsyncData";

export const useDepartments = () =>
  useAsyncData<LookupOption[]>(fetchDepartments, "Couldn't load departments.");
