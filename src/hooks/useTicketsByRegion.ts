import { fetchTicketsByRegion } from "../api/dashboard/dashboard.js";
import type { NamedCount } from "../types/dashboard";
import { useAsyncData } from "./useAsyncData";

export const useTicketsByRegion = () =>
  useAsyncData<NamedCount[]>(fetchTicketsByRegion, "Couldn't load region data.");
