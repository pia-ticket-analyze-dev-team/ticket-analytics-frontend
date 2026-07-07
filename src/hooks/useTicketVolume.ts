import { fetchTicketVolume } from "../api/dashboard/dashboard.js";
import type { DailyTicketVolume } from "../types/dashboard";
import { useAsyncData } from "./useAsyncData";

export const useTicketVolume = () =>
  useAsyncData<DailyTicketVolume[]>(fetchTicketVolume, "Couldn't load ticket volume.");
