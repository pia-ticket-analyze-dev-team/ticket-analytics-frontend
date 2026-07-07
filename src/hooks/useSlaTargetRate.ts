import { fetchSlaTargetRate } from "../api/analytics/analytics.js";
import type { SlaTargetRate } from "../types/analytics";
import { useAsyncData } from "./useAsyncData";

export const useSlaTargetRate = () =>
  useAsyncData<SlaTargetRate>(fetchSlaTargetRate, "Couldn't load SLA breach rate.");
