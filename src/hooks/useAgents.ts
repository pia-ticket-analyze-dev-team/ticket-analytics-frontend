import { fetchAgents } from "../api/lookup/lookup.js";
import type { LookupOption } from "../types/lookup";
import { useAsyncData } from "./useAsyncData";

export const useAgents = () => useAsyncData<LookupOption[]>(fetchAgents, "Couldn't load agents.");
