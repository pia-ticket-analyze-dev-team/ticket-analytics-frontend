import { fetchAgentPerformance } from "../api/analytics/analytics.js";
import type { AgentPerformance, PageResponse } from "../types/analytics";
import { useAsyncData } from "./useAsyncData";

export const useAgentPerformance = () =>
  useAsyncData<PageResponse<AgentPerformance>>(
    fetchAgentPerformance,
    "Couldn't load agent performance."
  );
