import { fetchTicketsByStatus } from "../api/dashboard/dashboard.js";
import type { StatusCount } from "../types/dashboard";
import { useAsyncData } from "./useAsyncData";

export const useTicketsByStatus = () =>
  useAsyncData<StatusCount[]>(fetchTicketsByStatus, "Couldn't load ticket status breakdown.");
