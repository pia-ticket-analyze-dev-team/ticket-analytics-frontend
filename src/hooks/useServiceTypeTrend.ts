import { fetchServiceTypeTrend } from "../api/analytics/analytics.js";
import type { ServiceTypeTrend } from "../types/analytics";
import { useAsyncData } from "./useAsyncData";

export const useServiceTypeTrend = () =>
  useAsyncData<ServiceTypeTrend[]>(fetchServiceTypeTrend, "Couldn't load service type data.");
