import { fetchInfrastructureTypes } from "../api/lookup/lookup.js";
import type { LookupOption } from "../types/lookup";
import { useAsyncData } from "./useAsyncData";

export const useInfrastructureTypes = () =>
  useAsyncData<LookupOption[]>(fetchInfrastructureTypes, "Couldn't load infrastructure types.");
