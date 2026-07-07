import { fetchRegions } from "../api/lookup/lookup.js";
import type { LookupOption } from "../types/lookup";
import { useAsyncData } from "./useAsyncData";

export const useRegions = () => useAsyncData<LookupOption[]>(fetchRegions, "Couldn't load cities.");
