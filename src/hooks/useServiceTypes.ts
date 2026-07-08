import { fetchServiceTypes } from "../api/lookup/lookup.js";
import type { LookupOption } from "../types/lookup";
import { useAsyncData } from "./useAsyncData";

export const useServiceTypes = () =>
  useAsyncData<LookupOption[]>(fetchServiceTypes, "Couldn't load service types.");
